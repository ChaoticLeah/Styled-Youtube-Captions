import Sidebar from './components/Sidebar.svelte';
import {describe, test, expect } from 'vitest';
import { createEvent, fireEvent, render, screen } from '@testing-library/svelte';
import CaptionChunkHolder from './components/CaptionChunkHolder.svelte';

describe("Sidebar Tests", () => {

    test("should render the component", () => {

        render(Sidebar);

        const handle = screen.getByTestId("handle");
        console.log(handle.parentElement?.style)

        fireEvent.mouseDown(handle);
        
        fireEvent.mouseMove(handle, {
            offsetX: 16,
            clientX: 16,
            pageX: 16,
        })
    
        fireEvent.mouseUp(handle)
        console.log(handle.parentElement?.style)

        // const firstTabNode = screen.getByText(/First Tab Heading/i)

        // expect(firstTabNode).toBeTruthy()
    });
});

describe("Caption Chunk Holder Tests", () => {

    test("should render the component", () => {

        render(CaptionChunkHolder);

        // const handle = screen.getByTestId("handle");
        // console.log(handle.parentElement?.style)

        // fireEvent.mouseDown(handle);
        
        // fireEvent.mouseMove(handle, {
        //     offsetX: 16,
        //     clientX: 16,
        //     pageX: 16,
        // })
    
        // fireEvent.mouseUp(handle)
        // console.log(handle.parentElement?.style)

        // const firstTabNode = screen.getByText(/First Tab Heading/i)

        // expect(firstTabNode).toBeTruthy()
    });
});

