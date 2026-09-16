import { useState } from "react";
import { Bell, Check, Save, ShieldCheck, SunMoon, UserRound } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const settingTabs = [
  { key: "profile", label: "Profile", icon: UserRound },
  { key: "appearance", label: "Appearance", icon: SunMoon },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "roles", label: "Roles & Access", icon: ShieldCheck },
];

const initialProfile = {
  name: "Hansha Malik",
  email: "hansha@example.com",
  role: "Administrator",
  department: "Operations",
  phone: "+91 98765 43210",
};

const initialNotifications = {
  criticalShipments: true,
  vehicleBreakdowns: true,
  routeDisruptions: true,
  warehouseIssues: true,
  shipmentUpdates: true,
  dailySummary: false,
  weeklySummary: true,
  systemAnnouncements: true,
  securityAlerts: true,
  inApp: true,
  email: true,
  push: false,
};

function Toggle({ checked, onChange, label }) {
  return <button type="button" role="switch" aria-checked={checked} aria-label={label} onClick={() => onChange(!checked)} className={`relative h-5 w-9 shrink-0 rounded-full border transition-colors ${checked ? "border-[#2196F3] bg-[#2196F3]" : "border-[#38516B] bg-[#0B1728]"}`}><span className={`absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-white transition-transform ${checked ? "translate-x-[17px]" : "translate-x-0.5"}`} /></button>;
}

function SettingsSectionHeader({ eyebrow, description }) {
  return <div className="border-b border-[#18304A] pb-5"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#38BDF8]">{eyebrow}</p><p className="mt-2 text-[13px] text-[#7F91A5]">{description}</p></div>;
}

function ProfileSettings({ profile, setProfile, onSave, onSecurityAction }) {
  const [errors, setErrors] = useState({});
  const update = (field, value) => { setProfile((current) => ({ ...current, [field]: value })); setErrors((current) => ({ ...current, [field]: "" })); };
  const save = () => { const next = {}; if (!profile.name.trim()) next.name = "Full name is required."; if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) next.email = "Enter a valid email address."; setErrors(next); if (!Object.keys(next).length) onSave(); };
  const input = (label, field, disabled = false) => <label className="block"><span className="mb-2 block text-[11px] font-medium text-[#A7B3C2]">{label}</span><input disabled={disabled} value={profile[field]} onChange={(event) => update(field, event.target.value)} className={`h-10 w-full rounded-md border bg-[#050D18] px-3 text-[12px] text-white outline-none transition-colors placeholder:text-[#53677D] focus:border-[#2196F3] disabled:cursor-not-allowed disabled:border-[#18304A] disabled:text-[#6F7D8E] ${errors[field] ? "border-[#EF4444]" : "border-[#223B56]"}`} />{errors[field] && <span className="mt-1 block text-[10px] text-[#F87171]">{errors[field]}</span>}</label>;
  return <div><SettingsSectionHeader eyebrow="PROFILE" description="Manage your personal information." /><div className="flex items-center gap-4 border-b border-[#18304A] py-6"><div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[#2196F3]/60 bg-[#0B1728] text-sm font-semibold text-[#38BDF8]">HM<span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#07111F] bg-[#22C55E]" /></div><div><p className="text-[14px] font-semibold text-white">Hansha Malik</p><p className="mt-1 text-[11px] text-[#7F91A5]">Administrator · Operations</p><button type="button" className="mt-2 text-[10px] font-semibold text-[#38BDF8] hover:text-white">CHANGE AVATAR</button></div></div><div className="py-6"><p className="text-[10px] font-semibold tracking-[0.16em] text-[#6F7D8E]">PERSONAL INFORMATION</p><div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">{input("Full Name", "name")}{input("Email", "email")}{input("Role", "role", true)}{input("Department", "department")}{input("Phone", "phone")}</div><button type="button" onClick={save} className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#087CF0] px-4 py-2.5 text-[10px] font-bold tracking-[0.1em] text-white transition-colors hover:bg-[#1686F5]"><Save size={14} /> SAVE CHANGES</button></div><div className="border-t border-[#18304A] pt-6"><p className="text-[10px] font-semibold tracking-[0.16em] text-[#6F7D8E]">SECURITY</p><div className="mt-4 divide-y divide-[#18304A]"><div className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-[12px] font-medium text-white">Password</p><p className="mt-1 text-[11px] text-[#7F91A5]">Last changed 24 days ago</p></div><button type="button" onClick={onSecurityAction} className="w-fit text-[10px] font-semibold text-[#38BDF8] hover:text-white">CHANGE PASSWORD</button></div><div className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-[12px] font-medium text-white">Two-factor authentication</p><p className="mt-1 text-[11px] text-[#7F91A5]">Recommended for admin access</p></div><button type="button" onClick={onSecurityAction} className="w-fit rounded-md border border-[#38516B] px-3 py-2 text-[10px] font-semibold text-[#A7B3C2] hover:border-[#2196F3] hover:text-white">ENABLE</button></div></div></div></div>;
}

function AppearanceSettings({ appearance, setAppearance, onSave }) {
  return <div><SettingsSectionHeader eyebrow="APPEARANCE" description="Customize how InMotion looks and behaves." /><div className="divide-y divide-[#18304A]"><div className="py-6"><p className="text-[10px] font-semibold tracking-[0.16em] text-[#6F7D8E]">THEME</p><div className="mt-3 inline-flex rounded-md border border-[#18304A] p-1">{["dark", "system", "light"].map((theme) => <button key={theme} type="button" onClick={() => setAppearance((current) => ({ ...current, theme }))} className={`px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] ${appearance.theme === theme ? "rounded bg-[#2196F3]/20 text-[#38BDF8]" : "text-[#7F91A5] hover:text-white"}`}>{theme}</button>)}</div><p className="mt-2 text-[11px] text-[#6F7D8E]">Dark is the preferred control-center theme.</p></div><div className="flex items-center justify-between py-5"><div><p className="text-[12px] font-medium text-white">Accent Color</p><p className="mt-1 text-[11px] text-[#7F91A5]">Current: Electric Blue</p></div><span className="h-5 w-5 rounded-full border-2 border-[#07111F] bg-[#2196F3] shadow-[0_0_0_1px_#38516B]" /></div><div className="flex items-center justify-between py-5"><div><p className="text-[12px] font-medium text-white">Reduce Motion</p><p className="mt-1 text-[11px] text-[#7F91A5]">Reduce non-essential animations across InMotion.</p></div><Toggle checked={appearance.reduceMotion} onChange={(value) => setAppearance((current) => ({ ...current, reduceMotion: value }))} label="Reduce Motion" /></div><div className="flex items-center justify-between py-5"><div><p className="text-[12px] font-medium text-white">Compact Mode</p><p className="mt-1 text-[11px] text-[#7F91A5]">Display more operational information with reduced spacing.</p></div><Toggle checked={appearance.compactMode} onChange={(value) => setAppearance((current) => ({ ...current, compactMode: value }))} label="Compact Mode" /></div></div><button type="button" onClick={onSave} className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#087CF0] px-4 py-2.5 text-[10px] font-bold tracking-[0.1em] text-white hover:bg-[#1686F5]"><Save size={14} /> SAVE PREFERENCES</button></div>;
}

const notificationGroups = [{ title: "REAL-TIME ALERTS", items: [["criticalShipments", "Critical shipment alerts", "Receive immediate notifications when critical shipments are at risk."], ["vehicleBreakdowns", "Vehicle breakdowns", "Know when a vehicle stops unexpectedly."], ["routeDisruptions", "Route disruptions", "Stay informed when route conditions change."], ["warehouseIssues", "Warehouse issues", "Get notified about hub capacity and availability."]] }, { title: "OPERATIONAL UPDATES", items: [["shipmentUpdates", "Shipment status updates", "Receive status changes for active shipments."], ["dailySummary", "Daily network summary", "A concise view of daily operations."], ["weeklySummary", "Weekly performance summary", "Review network performance each week."]] }, { title: "SYSTEM", items: [["systemAnnouncements", "System announcements", "Important updates about InMotion."], ["securityAlerts", "Security alerts", "Protect your workspace and account."]] }, { title: "NOTIFICATION DELIVERY", items: [["inApp", "In-app", "Show alerts inside the control center."], ["email", "Email", "Send operational updates to your inbox."], ["push", "Push", "Receive updates on supported devices."]] }];

function NotificationSettings({ notifications, setNotifications, onSave }) {
  return <div><SettingsSectionHeader eyebrow="NOTIFICATIONS" description="Choose which operational events should notify you." />{notificationGroups.map((group) => <div key={group.title} className="border-b border-[#18304A] py-6"><p className="text-[10px] font-semibold tracking-[0.16em] text-[#6F7D8E]">{group.title}</p><div className="mt-3 divide-y divide-[#18304A]">{group.items.map(([key, title, description]) => <div key={key} className="flex items-center justify-between gap-5 py-3"><div><p className="text-[12px] font-medium text-white">{title}</p><p className="mt-1 text-[11px] text-[#7F91A5]">{description}</p></div><Toggle checked={notifications[key]} onChange={(value) => setNotifications((current) => ({ ...current, [key]: value }))} label={title} /></div>)}</div></div>)}<button type="button" onClick={onSave} className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#087CF0] px-4 py-2.5 text-[10px] font-bold tracking-[0.1em] text-white hover:bg-[#1686F5]"><Save size={14} /> SAVE NOTIFICATIONS</button></div>;
}

function RolesSettings({ onSecurityAction }) {
  const permissions = ["View dashboard", "View network", "Manage shipments", "Manage fleet", "Manage warehouses", "Manage alerts", "View analytics", "Manage users"];
  return <div><SettingsSectionHeader eyebrow="ROLES & ACCESS" description="Manage workspace permissions and access levels." /><div className="flex items-center gap-4 border-b border-[#18304A] py-6"><div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#2196F3]/60 bg-[#0B1728] text-sm font-semibold text-[#38BDF8]">HM</div><div><p className="text-[14px] font-semibold text-white">Hansha Malik</p><p className="mt-1 text-[11px] text-[#7F91A5]">Administrator · Current user</p></div></div><div className="grid grid-cols-1 gap-4 border-b border-[#18304A] py-6 sm:grid-cols-2"><div><p className="text-[10px] tracking-[0.15em] text-[#6F7D8E]">ROLE</p><p className="mt-2 text-[13px] text-white">Administrator</p></div><div><p className="text-[10px] tracking-[0.15em] text-[#6F7D8E]">ACCESS LEVEL</p><p className="mt-2 text-[13px] text-white">Full operational access</p></div></div><div className="border-b border-[#18304A] py-6"><p className="text-[10px] font-semibold tracking-[0.16em] text-[#6F7D8E]">PERMISSIONS</p><div className="mt-4 divide-y divide-[#18304A]">{permissions.map((permission) => <div key={permission} className="flex items-center justify-between py-2.5 text-[12px]"><span className="text-[#A7B3C2]">{permission}</span><Check size={15} className="text-[#22C55E]" /></div>)}</div></div><div className="border-b border-[#18304A] py-6"><p className="text-[10px] font-semibold tracking-[0.16em] text-[#6F7D8E]">AVAILABLE ROLES</p><div className="mt-4 grid gap-4 sm:grid-cols-3">{[["ADMINISTRATOR", "Full access to operational controls and configuration."], ["OPERATOR", "Monitor network activity and manage events."], ["VIEWER", "Read-only access to logistics information."]].map(([role, description]) => <div key={role}><p className="text-[11px] font-semibold text-white">{role}</p><p className="mt-1 text-[11px] leading-5 text-[#7F91A5]">{description}</p></div>)}</div></div><div className="pt-6"><p className="text-[10px] font-semibold tracking-[0.16em] text-[#6F7D8E]">SECURITY</p><div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-[12px] text-white">Two-factor authentication</p><p className="mt-1 text-[11px] text-[#7F91A5]">Recommended for administrator access.</p></div><button type="button" onClick={onSecurityAction} className="w-fit rounded-md border border-[#38516B] px-3 py-2 text-[10px] font-semibold text-[#A7B3C2] hover:border-[#2196F3] hover:text-white">ENABLE</button></div></div></div>;
}

function Settings() {
  const location = useLocation();
  const activeKey = location.pathname.split("/").pop() === "settings" ? "profile" : location.pathname.split("/").pop();
  const [profile, setProfile] = useState(initialProfile);
  const [appearance, setAppearance] = useState({ theme: "dark", reduceMotion: false, compactMode: false });
  const [notifications, setNotifications] = useState(initialNotifications);
  const [notice, setNotice] = useState("");
  const showNotice = (message) => { setNotice(message); setTimeout(() => setNotice(""), 2200); };
  const activeTab = settingTabs.find((tab) => tab.key === activeKey) || settingTabs[0];
  return <main className="min-h-screen bg-[#020812] px-5 pb-12 pt-[98px] text-[#F5F7FA] lg:ml-[248px] lg:px-7"><div className="mx-auto max-w-[1280px]"><div className="border-b border-[#18304A] pb-6"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#38BDF8]">Workspace / Preferences</p><h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">SETTINGS</h1><p className="mt-1 text-[13px] text-[#7F91A5]">Manage your account, workspace preferences and access.</p></div><div className="grid grid-cols-1 gap-8 pt-7 lg:grid-cols-[220px_minmax(0,1fr)]"><nav className="flex gap-1 overflow-x-auto border-b border-[#18304A] pb-3 lg:block lg:border-b-0 lg:pb-0">{settingTabs.map(({ key, label, icon: Icon }) => <Link key={key} to={`/app/settings/${key}`} className={`relative flex shrink-0 items-center gap-3 rounded-md px-3 py-2.5 text-[12px] transition-colors lg:w-full ${activeTab.key === key ? "bg-[#2196F3]/12 text-white" : "text-[#7F91A5] hover:bg-[#07111F] hover:text-white"}`}><span className={`absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 ${activeTab.key === key ? "bg-[#2196F3]" : "bg-transparent"}`} /><Icon size={16} className={activeTab.key === key ? "text-[#38BDF8]" : "text-[#6F7D8E]"} />{label}</Link>)}</nav><section className="min-w-0 max-w-[780px]">{activeTab.key === "profile" && <ProfileSettings profile={profile} setProfile={setProfile} onSave={() => showNotice("Changes saved")} onSecurityAction={() => showNotice("Security action queued")} />}{activeTab.key === "appearance" && <AppearanceSettings appearance={appearance} setAppearance={setAppearance} onSave={() => showNotice("Preferences saved")} />}{activeTab.key === "notifications" && <NotificationSettings notifications={notifications} setNotifications={setNotifications} onSave={() => showNotice("Notification preferences saved")} />}{activeTab.key === "roles" && <RolesSettings onSecurityAction={() => showNotice("Security action queued")} />}</section></div></div>{notice && <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-md border border-[#22C55E]/40 bg-[#07111F] px-4 py-3 text-[12px] text-[#B7E5C5] shadow-[0_12px_30px_rgba(0,0,0,0.4)]"><Check size={14} />{notice}</div>}</main>;
}

export default Settings;
