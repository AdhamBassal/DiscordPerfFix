import definePlugin from "@utils/types";

export default definePlugin({
    name: "PerfFixes",
    description: "Removes Discord DOM churn that forces whole-page style recalcs on scrolls, menus and popouts",
    authors: [{ name: "Lund", id: 0n }],
    patches: [
        {
            find: '"aria-multiselectable":!1,className:',
            replacement: {
                match: /(className:\i\(\)\(\{\[\i\.\i\]:!0,\[\i\.\i\]:)\i(?=\}\),experimental_useStack)/,
                replace: "$1!1"
            }
        },
        {
            find: "--floating-ui-scrollbar-width",
            replacement: {
                match: /if\((\i)\)return 1==\+\+/,
                replace: "if(!1&&$1)return 1==++"
            }
        },
        {
            find: "this.node.dataset.liveAnnouncer=",
            all: true,
            noWarn: true,
            replacement: {
                match: /this\.parentNode\.prepend\(this\.node\)/g,
                replace: "(this.parentNode===document.body?this.parentNode.append(this.node):this.parentNode.prepend(this.node))"
            }
        }
    ]
});
