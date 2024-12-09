import { SearchBar } from "@/components/ui/search-bar";

export function Header() {
  return (
    <div>
      <div className="full-w mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-end justify-end">
            <SearchBar placeholder="Search" />
        </div>
      </div>
    </div>
  );
}
