import { Models } from 'appwrite';
import { Loader } from 'lucide-react';

import GridPostList from './GridPostList';

type searchedResultProps = {
        isSearchFetching: boolean;
        searchedPost: Models.Document[] | undefined;
};
const SearchResults = ({ isSearchFetching, searchedPost }: searchedResultProps) => {
        if (isSearchFetching) return <Loader />;

        if (searchedPost && searchedPost.length > 0) return <GridPostList posts={searchedPost} />;
        return <p className="text-light-4 mt-10 text-center w-full">No results found</p>;
};

export default SearchResults;
