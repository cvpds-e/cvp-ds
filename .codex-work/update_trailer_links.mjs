import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const inputPath = "/Users/gnedev304@emea.comcast.com/Documents/cvp-ds-main/outputs/cvp_video_title_media_mapping_with_youtube_links.xlsx";
const outputPath = "/Users/gnedev304@emea.comcast.com/Documents/cvp-ds-main/outputs/cvp_video_title_media_mapping_with_youtube_links.xlsx";

// Each URL was selected from YouTube search results for the matching title.
// The rows omitted below did not have an unambiguous title-level trailer result.
const links = new Map([
  [2,"nUEQNVV3Gfs"],[3,"RqrXhwS33yc"],[4,"32RAq6JzY-w"],[5,"DNJPtaQe4d4"],[6,"0VH9WCFV6XQ"],[7,"BRb4U99OU80"],[8,"zvwDen1Wrx8"],[9,"wjDJNEPghNY"],[10,"DuWEEKeJLMI"],[11,"0wiBHEACNHs"],[12,"sW8DH0HbzyM"],[13,"kYzz0FSgpSU"],[14,"hMbexEPAOQI"],[15,"CbX_SIz_9fk"],[16,"fnXzKwUgDhg"],[17,"EkqdO8dhptc"],[18,"T9bQCAWahLk"],[19,"S3jYTBqKGAk"],[20,"_1wDBNHYDv8"],[21,"uzqYqoVoU74"],[22,"WaG1KZqrLvM"],[23,"eb8wTIcGLgQ"],[24,"8-8eEniEfgU"],[25,"8piqd2BWeGI"],[26,"beHzfQPaTaw"],[27,"P8xLgg-MNKw"],[28,"zuZnRUcoWos"],[29,"fBbi4NeebAk"],[30,"3HxEXnVSr1w"],[31,"PIxpPMyGcpU"],[32,"6dSKUoV0SNI"],[33,"KlfUbZJVInA"],[34,"oSz9MDN-iac"],[35,"EqPnIcDW9g0"],[36,"sCmYN6TLd8A"],[37,"6vtWbQtAHVs"],[38,"cCtm8L4PQt8"],[39,"7HCWQjIHJic"],[40,"XOTkNsxhECY"],[41,"AhKLpJmHhIg"],[42,"7i5kiFDunk8"],[43,"zFIT_jasskw"],[44,"wBM0_6JJw1s"],[45,"DjODCllZj4w"],[46,"bE8pwEF-3TI"],[47,"ByehYal_cCs"],[48,"DKgW8UcGMNk"],[49,"TRFM7HQmkH0"],[50,"PVKVgkm-nkA"],[51,"lY1zndVdiKM"],[52,"cm-tgph1IQw"],[53,"g9Mx2OLnoGI"],[54,"pY7sAJm8Fuk"],[55,"Ebv9_rNb5Ig"],[56,"AAflXqZ5xs0"],[57,"i9k213d5FU0"],[58,"e01NVCveGkg"],[59,"Sq5CIH0duMk"],[60,"bK6ldnjE3Y0"],[61,"TnGl01FkMMo"],
  [63,"IIeSDILTE5M"],[64,"_KQWHf4aqhU"],[65,"PJpsRF-TJAE"],[68,"29_gA_GDGvE"],[69,"YKtH0mVhwSg"],[72,"vxuvhsip7W4"],[73,"tV1ShgTZ10Q"],[74,"4vskAt_aABg"],[75,"xEYp3VpX0_k"],[76,"fFYh-Ycx2Mc"],[77,"L_AQR_GorHY"],[79,"3Bt3Q470YGE"],[81,"EmZa240cLik"],[83,"WwoJCGbhne4"],[84,"ZsL7lWz1Jbo"],[85,"E6xLLe6gBC0"],[86,"vlb1-gLdbP4"],[87,"e4LJ_n69n1s"],[88,"D0JPAeavmDM"],[89,"_PtsEbOPoig"],[90,"M4kLPT4oGUg"],[91,"cs1rYZcE2k8"]
]);

const source = await FileBlob.load(inputPath);
const workbook = await SpreadsheetFile.importXlsx(source);
const sheet = workbook.worksheets.getItem("Video Mapping");
for (let row = 2; row <= 91; row++) {
  const id = links.get(row);
  if (id) {
    sheet.getRange(`D${row}`).values = [[`https://www.youtube.com/watch?v=${id}`]];
    sheet.getRange(`J${row}`).values = [["YES"]];
  }
}
await fs.mkdir(new URL(".", `file://${outputPath}`).pathname, { recursive: true }).catch(() => {});
await fs.mkdir("/Users/gnedev304@emea.comcast.com/Documents/cvp-ds-main/outputs", { recursive: true });
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
const check = await workbook.inspect({ kind: "table", range: "Video Mapping!A1:J12", include: "values", tableMaxRows: 12, tableMaxCols: 10 });
console.log(check.ndjson);
const errors = await workbook.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 100 }, summary: "formula error scan" });
console.log(errors.ndjson);
const preview = await workbook.render({ sheetName: "Video Mapping", range: "A1:J18", scale: 1.2, format: "png" });
await fs.writeFile("/Users/gnedev304@emea.comcast.com/Documents/cvp-ds-main/outputs/cvp_video_title_media_mapping_preview.png", new Uint8Array(await preview.arrayBuffer()));
console.log(JSON.stringify({ populated: links.size, outputPath }));
