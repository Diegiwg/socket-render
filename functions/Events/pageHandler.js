import { loadPage } from "../Page.js";

export function renderPage(io) {
    const { client } = io;

    client.on("Event::RenderPage", (data) => {
        const { page, dynamic_content } = data;
        if (!page) return;

        client.emit("Event::RenderPage", {
            page: "Home",
            content: loadPage(page, { page, ...dynamic_content }),
        });
    });
}
