import fs from "fs";
import mustache from "mustache";
import { renderComponents } from "./Component.js";

function evalPageData(name) {
    try {
        const javascript = fs.readFileSync(`pages/${name}.js`, "utf8");
        return eval(javascript + "load()");
    } catch {
        return {};
    }
}

export function loadPage(name, dynamic_content) {
    try {
        let html = fs.readFileSync(`pages/${name}.html`, "utf8");
        const content = {
            ...evalPageData(name),
            ...dynamic_content,
        };

        html = renderComponents(html, content);

        return mustache.render(html, content);
    } catch {
        return;
    }
}
