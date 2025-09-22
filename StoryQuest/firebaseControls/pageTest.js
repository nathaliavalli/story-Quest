
"use client";
import React from 'react';
import { setDoc, doc } from "firebase/firestore";
import { db } from './firebaseConfig';

/**
 * Home component: Adds a test document to Firestore.
 * This component is a Client Component.
 */
export default function Home() {
    /**
     * useEffect hook: Runs once after the component mounts.
     * Calls the testAdd function to add the document.
     */
    React.useEffect(() => {
        /**
         * testAdd function: Adds a test document to the "Test" collection.
         * Uses setDoc to write the data.
         */
        const testAdd = async () => {
            try {
                /**
                 * Creates a reference to the document with ID "1234" in the "Test" collection.
                 */
                await setDoc(doc(db, "Test", "1234"), { test: "hello" });
                console.log("Document successfully written/updated!");
            } catch (e) {
                console.error("Error setting document: ", e);
            }
        };
        testAdd();
    }, []);

    /**
     * Renders the component.
     * Returns a simple div with the text "Testing".
     */
    return <div>Testing</div>;
}