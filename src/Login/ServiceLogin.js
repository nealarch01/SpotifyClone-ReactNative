import React from 'react';

// function will call a private credential function
export function TrySignIn(username, password) {
    if (areCredentialsValid(username, password)) {
        return true;
    }
    return false;
}


function areCredentialsValid(username, password) {
    if (username === '' || password === '') {
        return false;
    }
    return true;
}