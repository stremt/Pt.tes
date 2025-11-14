import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { tools, getToolIcon } from "@/lib/tools";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/contexts/SearchContext";

export function SearchDialog() {
  const { isOpen, closeSearch } = useSearch();
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTools, setFilteredTools] = useState(tools);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredTools(tools);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = tools.filter((tool) => {
      const matchesName = tool.name.toLowerCase().includes(query);
      const matchesDescription = tool.description.toLowerCase().includes(query);
      const matchesKeywords = tool.keywords.some((keyword) =>
        keyword.toLowerCase().includes(query)
      );
      const matchesCategory = tool.category.toLowerCase().includes(query);

      return matchesName || matchesDescription || matchesKeywords || matchesCategory;
    });

    setFilteredTools(filtered);
  }, [searchQuery]);

  const handleToolSelect = (toolPath: string) => {
    setLocation(toolPath);
    closeSearch();
    setSearchQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && filteredTools.length > 0) {
      handleToolSelect(filteredTools[0].path);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeSearch();
      setSearchQuery("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-2xl font-bold">Search Tools</DialogTitle>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, description, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 h-11"
              autoFocus
              data-testid="input-search-tools"
            />
          </div>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(80vh-180px)] px-6 py-4">
          {filteredTools.length === 0 ? (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium text-muted-foreground">No tools found</p>
              <p className="text-sm text-muted-foreground mt-2">
                Try searching with different keywords
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredTools.map((tool) => {
                const Icon = getToolIcon(tool.icon);
                return (
                  <button
                    key={tool.id}
                    onClick={() => handleToolSelect(tool.path)}
                    className="w-full text-left p-4 rounded-lg border-2 border-border hover:border-primary/50 hover-elevate active-elevate-2 transition-all duration-200 group"
                    data-testid={`button-search-result-${tool.id}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:from-primary/30 group-hover:to-primary/10 transition-all">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
                            {tool.name}
                          </h3>
                          <Badge variant="secondary" className="capitalize text-xs">
                            {tool.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {tool.description}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t bg-muted/30">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {filteredTools.length} {filteredTools.length === 1 ? "tool" : "tools"} found
            </span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-background border rounded text-xs">Enter</kbd>
                to select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-background border rounded text-xs">Esc</kbd>
                to close
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function SearchButton({ variant = "default" }: { variant?: "default" | "ghost" | "outline" }) {
  const { openSearch } = useSearch();

  return (
    <Button
      variant={variant}
      size="sm"
      onClick={openSearch}
      className="gap-2"
      data-testid="button-search"
    >
      <Search className="h-4 w-4" />
      <span className="hidden sm:inline">Search</span>
      <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 ml-1">
        <span className="text-xs">⌘</span>K
      </kbd>
    </Button>
  );
}
