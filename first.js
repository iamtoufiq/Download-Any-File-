const fileInput = document.querySelector("input"),
  downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  downloadBtn.innerText = "Downloading file...";
  fetchFile(fileInput.value);
});

function fetchFile(url) {
  //fetching file and returing responses as blob.
  fetch(url)
    .then((res) => res.blob())
    .then((file) => {
      //URL.createObjectURL creates a url of passed object.
      let tempUrl = URL.createObjectURL(file);
      console.log(`this is the temp url ${tempUrl}`);
      const aTag = document.createElement("a");
      aTag.href = tempUrl; // passing tempUrl as href value of <a> tag.
      //passing file last name and extension as download value of <a>
      aTag.download = url.replace(/^.*[\\\/]/, "");
      document.body.appendChild(aTag);
      aTag.click(); // clicking <a> tag so the file donwload.
      aTag.remove(); // removing  <a> tag once the file donwloaded.
      downloadBtn.innerText = "Download File";
      URL.revokeObjectURL(tempUrl);
      aTag.remove();
    })
    .catch(() => {
      alert("Failed to download file! Please enter a valid URL.");
      downloadBtn.innerText = "Download File";
    });
}
