import Handlebars from "handlebars";
import fs from "fs";
import path from "path";

const HBS_DIR = path.join(__dirname, "hbs");

const read = (name: string) =>
  fs.readFileSync(path.join(HBS_DIR, `${name}.hbs`), "utf8");

const layout = Handlebars.compile(read("layout"));

export const renderEmail = (
  templateName: string,
  data: Record<string, unknown> = {},
): string => {
  const renderContent = Handlebars.compile(read(templateName));
  const content = renderContent(data);
  return layout({ ...data, content });
};

export const renderTaskReminderEmail = (
  title: string,
  type: "reminder" | "due",
): string => {
  const isReminder = type === "reminder";
  return renderEmail("task-reminder", {
    title,
    isReminder,
    accentColor: isReminder ? "#f59e0b" : "#ef4444",
    badgeBg: isReminder ? "#fffbeb" : "#fef2f2",
    badgeText: isReminder ? "#b45309" : "#b91c1c",
    emailTitle: isReminder ? "Task Due Soon" : "Task Due Now",
    footerText:
      "This is an automated reminder from your task manager.<br>If this task is no longer relevant, you can safely ignore this email.",
  });
};
