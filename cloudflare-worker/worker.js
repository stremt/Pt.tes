export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // API Proxy for Mail.tm
    if (url.pathname.startsWith('/api/tempmail/')) {
      const targetUrl = 'https://api.mail.tm' + url.pathname.replace('/api/tempmail', '');
      
      const newRequest = new Request(targetUrl, {
        method: request.method,
        headers: request.headers,
        body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.arrayBuffer() : null,
      });

      const response = await fetch(newRequest);
      const newResponse = new Response(response.body, response);
      
      // Handle CORS
      newResponse.headers.set('Access-Control-Allow-Origin', '*');
      newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      newResponse.headers.set('Access-Control-Allow-Headers', '*');
      
      return newResponse;
    }

    // Handle other /api/* requests if needed, otherwise fallback to frontend
    return new Response('Not Found', { status: 404 });
  }
};
