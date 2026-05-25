// Run: node preview-email.js [template-name]
// Templates: welcome | password-reset | password-reset-success | task-reminder
const Handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const HBS_DIR = path.join(__dirname, "src", "utils", "templates", "hbs");
const OUT_FILE = path.join(__dirname, "email-preview.html");

const read = (name) =>
  fs.readFileSync(path.join(HBS_DIR, `${name}.hbs`), "utf8");

const SAMPLE_DATA = {
  welcome: {
    emailTitle: "Welcome to Todo App",
    accentColor: "#10b981",
    footerText:
      "You're receiving this because you just signed up.<br>© 2026 Todo App",
    name: "Babz",
  },
  "password-reset": {
    emailTitle: "Reset Your Password",
    accentColor: "#6366f1",
    footerText:
      "This code expires in 5 minutes. If you didn't request this, ignore it.<br>© 2026 Todo App",
    otp: "847291",
  },
  "password-reset-success": {
    emailTitle: "Password Updated",
    accentColor: "#10b981",
    footerText:
      "If you didn't make this change, contact support immediately.<br>© 2026 Todo App",
    timestamp: new Date().toLocaleString("en-GB", {
      dateStyle: "full",
      timeStyle: "short",
    }),
  },
  "task-reminder": {
    emailTitle: "Task Due Soon",
    accentColor: "#f59e0b",
    badgeBg: "#fffbeb",
    badgeText: "#b45309",
    footerText:
      "This is an automated reminder from your task manager.<br>© 2026 Todo App",
    title: "Finish project report",
    isReminder: true,
  },
};

const templateName = "task-reminder";
const data = SAMPLE_DATA[templateName];

if (!data) {
  console.error(
    `Unknown template: "${templateName}"\nAvailable: ${Object.keys(SAMPLE_DATA).join(" | ")}`,
  );
  process.exit(1);
}

const layout = Handlebars.compile(read("layout"));
const renderContent = Handlebars.compile(read(templateName));
const content = renderContent(data);
const html = layout({ ...data, content });

fs.writeFileSync(OUT_FILE, html);
console.log(`Preview written to: ${OUT_FILE}`);

// Open in default browser (Windows)
exec(`start "" "${OUT_FILE}"`);
