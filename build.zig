const std = @import("std");
const zine = @import("zine");

pub fn build(b: *std.Build) !void {
    zine.website(b, .{
        .title = "Anoop K. Chandran - Personal blog",
        .host_url = "#",
        .layouts_dir_path = "layouts",
        .content_dir_path = "content",
        .assets_dir_path = "assets",
        .static_assets = &.{
            "CNAME",
            "fonts/zed/zed-sans-extended.ttf",
            "fonts/zed/zed-sans-extended.ttf",
            "fonts/zed/zed-sans-extendedextrabold.ttf",
            "fonts/zed/zed-sans-extendedlight.ttf",
            "fonts/zed/zed-sans-extendedbold.ttf",
            "fonts/zed/zed-sans-extendedextrabolditalic.ttf",
            "fonts/zed/zed-sans-extendedlightitalic.ttf",
            "fonts/zed/zed-sans-extendedbolditalic.ttf",
            "fonts/zed/zed-sans-extendeditalic.ttf",
            "fonts/zed/zed-mono-extended.ttf"
        },
        .build_assets = &.{
            .{
                .name = "zon",
                .lp = b.path("build.zig.zon"),
            },
            .{
                .name = "frontmatter",
                .lp = b.dependency("zine", .{}).path(
                    "frontmatter.ziggy-schema",
                ),
            },
        },
        .debug = true,
    });

    // This line creates a build step that generates an updated
    // Scripty reference file. Other sites will not need this
    // most probably, but at least it's an example of how Zine
    // can integrate neatly with other Zig build steps.
    // zine.scriptyReferenceDocs(
    //     b,
    //     "content/docs/superhtml/scripty.smd",
    //     "content/docs/supermd/scripty.smd",
    // );
}
