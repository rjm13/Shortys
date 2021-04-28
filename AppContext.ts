import React from 'react';

const context = {
    storyID: null,
    setStoryID: (id: string) => {}

}

export const AppContext = React.createContext(context);