<script>
  let data;

  // 加载 JSON 数据
  fetch('data.json')
    .then(response => response.json())
    .then(json => {
      data = json;
    });

 function search() {
  const input = document.getElementById('searchInput').value.trim();
  const resultDiv = document.getElementById('result');
  const notFoundDiv = document.getElementById('notFound');

  resultDiv.innerHTML = "";
  resultDiv.style.display = "none";
  notFoundDiv.style.display = "none";

  if (!input || !data) return;

  const record = data.find(
    item => item["学号"] === input || item["姓名"] === input
  );

  if (record) {
    let html = `
      <p><strong>姓名：</strong>${record["姓名"]}</p>
      <p><strong>学号：</strong>${record["学号"]}</p>
      <p><strong>所在学院：</strong>${record["所在学院"]}</p>
      <p><strong>已完成学时：</strong>${record["已完成学时"]}</p>
      <p><strong>参与活动：</strong></p>
      <ul>
    `;

    let hasActivity = false;
    for (let key in record) {
      if (!["姓名", "学号", "所在学院", "已完成学时"].includes(key)) {
        const hours = record[key];
        if (typeof hours === "number" && hours > 0) {
          html += `<li>${key}：${hours} 学时</li>`;
          hasActivity = true;
        }
      }
    }

    if (!hasActivity) {
      html += `<li>无</li>`;
    }

    html += "</ul>";

    resultDiv.innerHTML = html;
    resultDiv.style.display = "block";
    notFoundDiv.style.display = "none";
  } else {
    resultDiv.style.display = "none";
    notFoundDiv.style.display = "block";
  }
}

</script>
