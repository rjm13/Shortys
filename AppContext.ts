import React from 'react';

const context = {
    storyID: null,
    setStoryID: (id: string | null) => {}

}

export const AppContext = React.createContext(context);