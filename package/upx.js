import nami from 'https://raw.githubusercontent.com/txthinking/nami/master/nami.js';

var n = nami("upx");
n.open_sourced_on("https://github.com/upx/upx");

var r = await n.fetch("https://api.github.com/repos/upx/upx/releases/latest");
var j = await r.json();
await n.version(j.tag_name);

if(Deno.build.os == "linux" && Deno.build.arch == "x86_64"){
    await n.download_commands_from_tgz_url(`https://github.com/upx/upx/releases/latest/download/upx-${j.tag_name.replace('v', '')}-amd64_linux.tar.xz`, {
        'upx': `upx-${j.tag_name.replace('v', '')}-amd64_linux/upx`,
    });
    Deno.exit(0);
}
if(Deno.build.os == "windows" && Deno.build.arch == "x86_64"){
    await n.download_commands_from_zip_url(`https://github.com/upx/upx/releases/latest/download/upx-${j.tag_name.replace('v', '')}-win64.zip`, {
        'upx.exe': `upx-${j.tag_name.replace('v', '')}-win64/upx.exe`,
    });
    Deno.exit(0);
}
n.unsupport();