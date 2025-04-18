import pandas as pd
import json
import os

def excel_to_json_and_update_all_activities(excel_path, json_path="data.json"):
    # 固定字段定义
    name_col = "姓名"
    id_col = "学号"
    college_col = "所在学院"
    hour_col = "已完成学时"
    fixed_cols = [name_col, id_col, college_col, hour_col]

    df = pd.read_excel(excel_path)

    # 自动识别所有活动列
    activity_cols = [col for col in df.columns if col not in fixed_cols]
    json_data = []

    for idx, row in df.iterrows():
        total_hours = 0
        activity_data = {}

        for act_col in activity_cols:
            val = str(row[act_col]).strip()
            if val and val.lower() not in ["nan", "0", "否", "×", "不"]:
                try:
                    hours = float(val)
                except:
                    hours = 0
            else:
                hours = 0

            activity_data[act_col] = int(hours)
            total_hours += hours

        # 更新 DataFrame 的学时列
        df.at[idx, hour_col] = int(total_hours)

        # 构建 JSON 数据
        record = {
            name_col: str(row.get(name_col, "")).strip(),
            id_col: str(row.get(id_col, "")).strip(),
            college_col: str(row.get(college_col, "")).strip(),
            hour_col: int(total_hours),
        }
        record.update(activity_data)

        if record[name_col] or record[id_col]:
            json_data.append(record)

    # 保存 JSON 文件
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(json_data, f, ensure_ascii=False, indent=2)
    print(f"✅ JSON 文件已生成：{json_path}")

    # 保存更新后的 Excel 文件
    new_excel_path = os.path.splitext(excel_path)[0] + "_已更新.xlsx"
    df.to_excel(new_excel_path, index=False)
    print(f"✅ Excel 学时已更新并保存为：{new_excel_path}")

if __name__ == "__main__":
    excel_files = [f for f in os.listdir(".") if f.endswith(".xlsx") or f.endswith(".xls")]
    if not excel_files:
        print("❌ 当前目录下未找到 Excel 文件")
    else:
        excel_to_json_and_update_all_activities(excel_files[0])
