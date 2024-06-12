import { Models } from 'appwrite';
import { Loader } from 'lucide-react';
import React from 'react';
import GridPostList from './GridPostList';

type searchedResultProps = {
        isSearchSearching: boolean;
        searchedPosts: Models.Document[];
};
const SearchResults = ({ isSearchFetching, searchedPost }: searchedResultProps) => {
        if (isSearchFetching) return <Loader />;

        if (searchedPost && searchedPost.documents.length > 0) return <GridPostList posts={searchedPost.documents} />;
        return <p className="text-light-4 mt-10 text-center w-full">No results found</p>;
};

export default SearchResults;
