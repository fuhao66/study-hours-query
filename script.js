
let data = [];

fetch("activity_data.json")
    .then(res => res.json())
    .then(json => data = json);

function search() {
    const keyword = document.getElementById("query").value.trim();
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    if (!keyword) {
        resultDiv.innerHTML = "<p>请输入姓名或学号</p>";
        return;
    }

    const record = data.find(item => item["姓名"] === keyword || item["学号"].toString() === keyword);
    if (!record) {
        resultDiv.innerHTML = "<p>未找到相关记录</p>";
        return;
    }

    let html = `<h3>${record["姓名"]} (${record["学号"]})</h3>`;
    html += `<p>所在学院：${record["所在学院"]}</p>`;
    html += `<p><strong>已完成学时：</strong> ${record["已完成学时"]}</p>`;
    html += "<h4>参与活动：</h4><ul>";
    for (let key in record) {
        if (key !== "姓名" && key !== "学号" && key !== "所在学院" && key !== "已完成学时" && record[key] > 0) {
            html += `<li class="activity">${key}：${record[key]} 学时</li>`;
        }
    }
    html += "</ul>";
    resultDiv.innerHTML = html;
}
