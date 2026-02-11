export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // API Proxy for Mail.tm (Temp Mail)
    if (url.pathname.startsWith('/api/tempmail/')) {
      const targetUrl = 'https://api.mail.tm' + url.pathname.replace('/api/tempmail', '');
      
      const newHeaders = new Headers(request.headers);
      newHeaders.set('Host', 'api.mail.tm');
      newHeaders.set('Origin', 'https://api.mail.tm');
      
      const newRequest = new Request(targetUrl, {
        method: request.method,
        headers: newHeaders,
        body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.arrayBuffer() : null,
        redirect: 'follow'
      });

      try {
        const response = await fetch(newRequest);
        const newResponse = new Response(response.body, response);
        
        // Add CORS headers for the frontend
        newResponse.headers.set('Access-Control-Allow-Origin', '*');
        newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        
        return newResponse;
      } catch (err) {
        return new Response(JSON.stringify({ error: 'Proxy Error', details: err.message }), { 
          status: 502,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Default response for other /api routes
    return new Response(JSON.stringify({ error: 'Not Found' }), { 
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
