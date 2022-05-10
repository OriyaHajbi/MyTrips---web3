const urlSites = "http://localhost:5500/sites";

async function httpRequestBuilder({
  url,
  method = "POST",
  headers = { "Content-Type": "application/json" },
  body,
}) {
  const res = await fetch(url, {
    method,
    headers,
    body: body && JSON.stringify(body),
  });

  if (!res.ok) throw new Error(await res.text());

  return res;
}

async function deleteHTMLSite() {
  const selectBox = document.getElementById("plan");
  const selectedValue = selectBox.options[selectBox.selectedIndex].value;
  const response = await httpRequestBuilder({
    url: `/sites/${selectedValue}`,
    method: "DELETE",
  });
  setTimeout(() => {location.reload();}, 500);
}

async function getHTMLSite() {
  const selectBox = document.getElementById("plan");
  const selectedValue = selectBox.options[selectBox.selectedIndex].value;
  const mainIFrame =  document.getElementById("myiframe");
  mainIFrame.src = `/sites/${selectedValue}`;
}
