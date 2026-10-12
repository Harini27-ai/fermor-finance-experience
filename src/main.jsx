import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity, ArrowDownLeft, ArrowDownRight, ArrowLeftRight, ArrowRight, ArrowUpRight,
  Bell, CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, CircleHelp,
  CreditCard, Download, Eye, EyeOff, FileText, Filter, Goal, Home, Landmark,
  LayoutDashboard, LogOut, Menu, Moon, MoreHorizontal, PiggyBank, Plus, Search,
  Settings, ShieldCheck, Sparkles, Sun, Target, TrendingDown, TrendingUp, Wallet,
  X, Zap
} from "lucide-react";
import {
  Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis
} from "recharts";
import "./styles.css";

const initialTransactions = [
  { id: 1, name: "Salary payment", category: "Income", date: "Oct 10, 2026", amount: 68500, type: "income", icon: "↗", account: "Main account" },
  { id: 2, name: "Freshmart Grocers", category: "Groceries", date: "Oct 10, 2026", amount: -1840, type: "expense", icon: "F", account: "Everyday card" },
  { id: 3, name: "Metro recharge", category: "Transport", date: "Oct 09, 2026", amount: -650, type: "expense", icon: "M", account: "Everyday card" },
  { id: 4, name: "Netflix", category: "Subscriptions", date: "Oct 08, 2026", amount: -649, type: "expense", icon: "N", account: "Everyday card" },
  { id: 5, name: "Cafe Mondo", category: "Dining", date: "Oct 07, 2026", amount: -420, type: "expense", icon: "C", account: "Everyday card" },
  { id: 6, name: "Freelance project", category: "Income", date: "Oct 06, 2026", amount: 8500, type: "income", icon: "↗", account: "Main account" },
  { id: 7, name: "Bookstore", category: "Shopping", date: "Oct 05, 2026", amount: -1250, type: "expense", icon: "B", account: "Everyday card" },
  { id: 8, name: "Electricity bill", category: "Bills", date: "Oct 04, 2026", amount: -1720, type: "expense", icon: "E", account: "Main account" },
];
const initialBudgets = [
  { name: "Groceries", spent: 6240, limit: 9000, color: "#729a79" },
  { name: "Dining", spent: 3280, limit: 4500, color: "#d7a36b" },
  { name: "Transport", spent: 1420, limit: 2500, color: "#7d91c9" },
  { name: "Shopping", spent: 3820, limit: 4000, color: "#c98383" },
  { name: "Subscriptions", spent: 1298, limit: 1800, color: "#9d87bd" },
];
const chartData = [
  { month: "May", income: 64000, expenses: 38200 }, { month: "Jun", income: 69000, expenses: 41400 },
  { month: "Jul", income: 67000, expenses: 39600 }, { month: "Aug", income: 72000, expenses: 43200 },
  { month: "Sep", income: 71000, expenses: 40100 }, { month: "Oct", income: 77000, expenses: 35800 },
];
const initialGoals = [
  { id: 1, name: "Emergency fund", target: 100000, saved: 62500, due: "Mar 2027", tone: "green" },
  { id: 2, name: "New laptop", target: 85000, saved: 51000, due: "Jan 2027", tone: "orange" },
  { id: 3, name: "Weekend getaway", target: 25000, saved: 11200, due: "Dec 2026", tone: "purple" },
];
const fmt = n => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
const shortFmt = n => n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${Math.round(n / 1000)}k`;

function App() {
  const [page, setPage] = useState("Overview");
  const [dark, setDark] = useState(false);
  const [hideMoney, setHideMoney] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [budgets, setBudgets] = useState(initialBudgets);
  const [goals, setGoals] = useState(initialGoals);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [range, setRange] = useState("6 months");
  const [showAdd, setShowAdd] = useState(false);
  const [showGoal, setShowGoal] = useState(false);
  const [showBudget, setShowBudget] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [assistantQuestion, setAssistantQuestion] = useState("");
  const [assistantReply, setAssistantReply] = useState("");
  const [notice, setNotice] = useState("");
  const [profile, setProfile] = useState({ name: "Harini", email: "harini@example.com" });
  const [newTxn, setNewTxn] = useState({ name: "", category: "Shopping", amount: "", type: "expense" });
  const [newGoal, setNewGoal] = useState({ name: "", target: "", saved: "" });
  const [newBudget, setNewBudget] = useState({ name: "", limit: "" });
  const [onboarded, setOnboarded] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);
  const [faqOpen, setFaqOpen] = useState(-1);
  const [selectedReport, setSelectedReport] = useState("October 2026");

  const visibleTransactions = useMemo(() => transactions.filter(t => {
    const matchesSearch = `${t.name} ${t.category} ${t.account}`.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || (filter === "Income" ? t.type === "income" : t.type === "expense");
    return matchesSearch && matchesFilter;
  }), [transactions, search, filter]);
  const totalBalance = 284650;
  const income = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expenses = transactions.filter(t => t.type === "expense").reduce((s, t) => s + Math.abs(t.amount), 0);
  const budgetSpent = budgets.reduce((s, b) => s + b.spent, 0);
  const budgetTotal = budgets.reduce((s, b) => s + b.limit, 0);
  const goalsSaved = goals.reduce((s, g) => s + g.saved, 0);
  const goalsTarget = goals.reduce((s, g) => s + g.target, 0);
  const money = n => hideMoney ? "••••••" : fmt(n);
  const flash = msg => { setNotice(msg); window.setTimeout(() => setNotice(""), 2800); };

  function addTransaction(e) {
    e.preventDefault();
    const amount = Math.abs(Number(newTxn.amount));
    if (!newTxn.name.trim() || !amount) return;
    const today = new Date();
    const date = today.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    setTransactions(prev => [{ id: Date.now(), name: newTxn.name, category: newTxn.category, date, amount: newTxn.type === "income" ? amount : -amount, type: newTxn.type, icon: newTxn.name[0].toUpperCase(), account: "Everyday card" }, ...prev]);
    setNewTxn({ name: "", category: "Shopping", amount: "", type: "expense" });
    setShowAdd(false); flash("Transaction added to your demo ledger.");
  }
  function addGoal(e) {
    e.preventDefault();
    if (!newGoal.name.trim() || Number(newGoal.target) <= 0) return;
    setGoals(prev => [...prev, { id: Date.now(), name: newGoal.name, target: Number(newGoal.target), saved: Math.max(0, Number(newGoal.saved) || 0), due: "Choose a date", tone: ["green", "orange", "purple"][prev.length % 3] }]);
    setNewGoal({ name: "", target: "", saved: "" }); setShowGoal(false); flash("Savings goal created.");
  }
  function addBudget(e) {
    e.preventDefault();
    if (!newBudget.name.trim() || Number(newBudget.limit) <= 0) return;
    setBudgets(prev => [...prev, { name: newBudget.name, spent: 0, limit: Number(newBudget.limit), color: ["#729a79", "#d7a36b", "#7d91c9", "#c98383"][prev.length % 4] }]);
    setNewBudget({ name: "", limit: "" }); setShowBudget(false); flash("Budget category added.");
  }
  function exportCSV() {
    const rows = [["Name", "Category", "Date", "Amount (INR)", "Type"], ...transactions.map(t => [t.name, t.category, t.date, t.amount, t.type])];
    const csv = rows.map(row => row.map(v => `"${String(v).replaceAll('"', '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a");
    a.href = url; a.download = "fermor-transactions.csv"; a.click(); URL.revokeObjectURL(url);
    flash("CSV export prepared.");
  }
  function askAssistant(e) {
    e.preventDefault();
    const q = assistantQuestion.toLowerCase();
    let reply = "Based on the sample transactions, your best next step is to review the Shopping category and set a weekly limit. This demo uses sample data and simple rules—not a connected financial adviser.";
    if (q.includes("spend") || q.includes("expense")) reply = `Your listed demo expenses total ${money(expenses)}. Your largest budget pressure is ${[...budgets].sort((a,b) => b.spent / b.limit - a.spent / a.limit)[0]?.name || "your flexible spending"}; review it before making new purchases.`;
    else if (q.includes("save") || q.includes("goal")) reply = `You have ${money(goalsSaved)} across ${goals.length} savings goals. Try scheduling a fixed amount after income arrives, then review progress each week.`;
    else if (q.includes("budget")) reply = `You've used ${Math.round(budgetSpent / budgetTotal * 100)}% of the budget limits shown. Shopping is closest to its limit, so pause non-essential purchases there.`;
    setAssistantReply(reply);
  }

  const navGroups = [
    { title: "YOUR MONEY", items: [{ name: "Overview", icon: LayoutDashboard }, { name: "Transactions", icon: ArrowLeftRight }, { name: "Budgets", icon: Wallet }, { name: "Savings goals", icon: Goal }] },
    { title: "PLAN AHEAD", items: [{ name: "Money insights", icon: Activity }, { name: "Reports", icon: FileText }, { name: "Recurring bills", icon: CalendarDays }] },
  ];
  const unread = notificationsRead ? 0 : 2;

  return <div className={`app-shell ${dark ? "dark" : ""}`}>
    {!onboarded && <div className="onboarding-overlay"><div className="onboarding-card">
      <div className="brand-mark large">f<span>.</span></div><p className="eyebrow">A FRESH START</p>
      <h1>{onboardingStep === 0 ? "Your money, in one clear place." : onboardingStep === 1 ? "Make a plan that feels doable." : "Ready when you are."}</h1>
      <p className="muted">{onboardingStep === 0 ? "See your balances, spending and savings without the clutter." : onboardingStep === 1 ? "Set simple budgets and goals that work around real life." : "Explore Fermor using safe sample data. Nothing is connected to your bank."}</p>
      <div className="step-dots"><i className={onboardingStep===0?"active":""}/><i className={onboardingStep===1?"active":""}/><i className={onboardingStep===2?"active":""}/></div>
      <button className="btn primary full" onClick={() => onboardingStep < 2 ? setOnboardingStep(s=>s+1) : setOnboarded(true)}>{onboardingStep < 2 ? "Continue" : "Explore demo"} <ArrowRight size={16}/></button>
      <button className="text-btn" onClick={() => setOnboarded(true)}>Skip introduction</button>
    </div></div>}
    <aside className={`sidebar ${mobileNav ? "mobile-open" : ""}`}>
      <div className="brand"><div className="brand-mark">f<span>.</span></div><span className="brand-word">fermor</span><button className="icon-btn sidebar-close" onClick={() => setMobileNav(false)}><X size={18}/></button></div>
      <div className="workspace"><div className="workspace-avatar">H</div><div><b>Personal space</b><small>Free plan</small></div><ChevronDown size={15}/></div>
      <nav>{navGroups.map(group => <div className="nav-group" key={group.title}><p className="nav-label">{group.title}</p>{group.items.map(item => <button key={item.name} className={`nav-item ${page===item.name?"selected":""}`} onClick={() => {setPage(item.name);setMobileNav(false)}}><item.icon size={18}/><span>{item.name}</span>{item.name==="Transactions" && <span className="nav-count">{transactions.length}</span>}</button>)}</div>)}</nav>
      <div className="sidebar-bottom">
        <div className="help-card"><div className="help-icon"><ShieldCheck size={17}/></div><b>Your privacy matters</b><p>This is a demo workspace. No bank account is connected.</p><button onClick={() => flash("Your demo data stays in this browser session.")}>Learn about safety <ArrowRight size={13}/></button></div>
        <button className="nav-item" onClick={() => setShowProfile(true)}><Settings size={18}/><span>Settings & profile</span></button>
        <div className="profile-row"><div className="avatar">H</div><div className="profile-meta"><b>{profile.name}</b><small>Personal account</small></div><button className="icon-btn" title="Profile settings" onClick={() => setShowProfile(true)}><MoreHorizontal size={18}/></button></div>
      </div>
    </aside>
    {mobileNav && <div className="mobile-scrim" onClick={() => setMobileNav(false)}/>}
    <main className="main-area">
      <header className="topbar">
        <div className="topbar-left"><button className="icon-btn mobile-menu" onClick={() => setMobileNav(true)}><Menu size={20}/></button><div className="breadcrumb">Workspace <ChevronRight size={14}/> <b>{page}</b></div></div>
        <div className="topbar-actions"><span className="demo-pill"><span/> DEMO MODE</span><button className="icon-btn" title={dark?"Switch to light mode":"Switch to dark mode"} onClick={() => setDark(d=>!d)}>{dark?<Sun size={18}/>:<Moon size={18}/>}</button><div className="notification-wrap"><button className="icon-btn" onClick={() => {setShowNotifications(v=>!v);setNotificationsRead(true)}} title="Notifications"><Bell size={18}/>{unread>0 && <i className="notification-dot"/>}</button>{showNotifications && <div className="notification-pop"><div className="pop-head"><b>Notifications</b><button className="icon-btn" onClick={()=>setShowNotifications(false)}><X size={15}/></button></div><div className="notice-line"><span className="notice-bullet amber"/><div><b>Shopping budget is nearly full</b><p>You've used 95% of this category.</p><small>Today · 9:15 AM</small></div></div><div className="notice-line"><span className="notice-bullet green"/><div><b>Savings momentum</b><p>Your emergency fund is 62% complete.</p><small>Yesterday</small></div></div></div>}</div><button className="avatar avatar-button" onClick={() => setShowProfile(true)}>H</button></div>
      </header>
      <div className="page-content">
        {page === "Overview" && <Overview money={money} hideMoney={hideMoney} setHideMoney={setHideMoney} range={range} setRange={setRange} budgets={budgets} goals={goals} budgetSpent={budgetSpent} budgetTotal={budgetTotal} goalsSaved={goalsSaved} goalsTarget={goalsTarget} transactions={transactions} setPage={setPage} setShowAdd={setShowAdd} setShowGoal={setShowGoal} setShowAssistant={setShowAssistant} />}
        {page === "Transactions" && <Transactions transactions={visibleTransactions} search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} setShowAdd={setShowAdd} exportCSV={exportCSV} />}
        {page === "Budgets" && <Budgets budgets={budgets} setBudgets={setBudgets} budgetSpent={budgetSpent} budgetTotal={budgetTotal} setShowBudget={setShowBudget} />}
        {page === "Savings goals" && <Goals goals={goals} setGoals={setGoals} setShowGoal={setShowGoal} />}
        {page === "Money insights" && <Insights budgets={budgets} goals={goals} expenses={expenses} income={income} setShowAssistant={setShowAssistant} />}
        {page === "Reports" && <Reports transactions={transactions} exportCSV={exportCSV} selectedReport={selectedReport} setSelectedReport={setSelectedReport} />}
        {page === "Recurring bills" && <Recurring flash={flash}/>}
      </div>
      <footer className="app-footer"><span>© 2026 Fermor Financial. Made for clarity.</span><span><i className="footer-dot"/> Demo data only <span className="footer-sep">·</span> <button onClick={() => flash("Help centre is a demo placeholder.")}>Help centre</button></span></footer>
    </main>
    {notice && <div className="toast"><span className="toast-check"><Check size={15}/></span>{notice}</div>}
    {showAdd && <Modal title="Add transaction" subtitle="Add an item to your demo ledger." onClose={() => setShowAdd(false)}><form onSubmit={addTransaction} className="modal-form">
      <label>Transaction name<input autoFocus required placeholder="e.g. Weekend groceries" value={newTxn.name} onChange={e=>setNewTxn({...newTxn,name:e.target.value})}/></label>
      <div className="form-row"><label>Amount (₹)<input required type="number" min="1" placeholder="0" value={newTxn.amount} onChange={e=>setNewTxn({...newTxn,amount:e.target.value})}/></label><label>Type<select value={newTxn.type} onChange={e=>setNewTxn({...newTxn,type:e.target.value})}><option value="expense">Expense</option><option value="income">Income</option></select></label></div>
      <label>Category<select value={newTxn.category} onChange={e=>setNewTxn({...newTxn,category:e.target.value})}>{["Groceries","Dining","Transport","Shopping","Subscriptions","Bills","Income","Other"].map(c=><option key={c}>{c}</option>)}</select></label>
      <div className="modal-actions"><button type="button" className="btn secondary" onClick={()=>setShowAdd(false)}>Cancel</button><button className="btn primary">Save transaction <ArrowRight size={15}/></button></div>
    </form></Modal>}
    {showGoal && <Modal title="Create a savings goal" subtitle="Give your next milestone a name." onClose={() => setShowGoal(false)}><form onSubmit={addGoal} className="modal-form">
      <label>Goal name<input required placeholder="e.g. Study abroad fund" value={newGoal.name} onChange={e=>setNewGoal({...newGoal,name:e.target.value})}/></label>
      <div className="form-row"><label>Target amount (₹)<input required min="1" type="number" placeholder="50000" value={newGoal.target} onChange={e=>setNewGoal({...newGoal,target:e.target.value})}/></label><label>Already saved (₹)<input min="0" type="number" placeholder="0" value={newGoal.saved} onChange={e=>setNewGoal({...newGoal,saved:e.target.value})}/></label></div>
      <div className="modal-actions"><button type="button" className="btn secondary" onClick={()=>setShowGoal(false)}>Cancel</button><button className="btn primary">Create goal <ArrowRight size={15}/></button></div>
    </form></Modal>}
    {showBudget && <Modal title="Add a budget" subtitle="Set a monthly limit for a spending category." onClose={() => setShowBudget(false)}><form onSubmit={addBudget} className="modal-form">
      <label>Category name<input required placeholder="e.g. Health & wellness" value={newBudget.name} onChange={e=>setNewBudget({...newBudget,name:e.target.value})}/></label>
      <label>Monthly limit (₹)<input required min="1" type="number" placeholder="3000" value={newBudget.limit} onChange={e=>setNewBudget({...newBudget,limit:e.target.value})}/></label>
      <div className="modal-actions"><button type="button" className="btn secondary" onClick={()=>setShowBudget(false)}>Cancel</button><button className="btn primary">Add budget <ArrowRight size={15}/></button></div>
    </form></Modal>}
    {showProfile && <Modal title="Your profile" subtitle="Manage your local demo profile." onClose={() => setShowProfile(false)}><form className="modal-form" onSubmit={e=>{e.preventDefault();setShowProfile(false);flash("Profile updated for this demo.")}}>
      <div className="profile-edit-avatar">H</div><label>Display name<input value={profile.name} onChange={e=>setProfile({...profile,name:e.target.value})} required/></label><label>Email address<input type="email" value={profile.email} onChange={e=>setProfile({...profile,email:e.target.value})} required/></label>
      <div className="profile-note"><ShieldCheck size={17}/><span>Authentication is not connected. This profile is stored only in the current app state.</span></div>
      <div className="modal-actions"><button type="button" className="btn secondary" onClick={()=>setShowProfile(false)}>Cancel</button><button className="btn primary">Save profile</button></div>
    </form></Modal>}
    {showAssistant && <Modal title="Money notes" subtitle="A simple, rule-based helper for this demo." onClose={() => {setShowAssistant(false);setAssistantReply("")}}><div className="assistant-modal"><div className="assistant-intro"><div className="assistant-symbol"><Sparkles size={20}/></div><div><b>Ask about your money</b><p>Try “Where am I spending most?” or “How are my goals doing?”</p></div></div><form onSubmit={askAssistant} className="assistant-form"><input value={assistantQuestion} onChange={e=>setAssistantQuestion(e.target.value)} placeholder="Ask a money question…" required/><button className="btn primary"><ArrowRight size={16}/></button></form>{assistantReply && <div className="assistant-reply"><span className="reply-label">YOUR MONEY NOTE</span><p>{assistantReply}</p><small>Generated from sample data using simple rules. Not financial advice.</small></div>}<div className="prompt-chips">{["Review my spending","How are my goals?","Help me budget"].map(q=><button key={q} onClick={()=>setAssistantQuestion(q)}>{q}</button>)}</div></div></Modal>}
  </div>;
}

function PageHeading({eyebrow, title, description, action}) {
  return <div className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-description">{description}</p></div>{action && <div className="heading-action">{action}</div>}</div>;
}
function Overview({money,hideMoney,setHideMoney,range,setRange,budgets,goals,budgetSpent,budgetTotal,goalsSaved,goalsTarget,transactions,setPage,setShowAdd,setShowGoal,setShowAssistant}) {
  const expenseData = [{name:"Housing",value:12500,color:"#496b50"},{name:"Lifestyle",value:8700,color:"#9eb9a2"},{name:"Food",value:6240,color:"#e2c08e"},{name:"Other",value:8360,color:"#c9c8bd"}];
  return <><PageHeading eyebrow="SATURDAY, OCTOBER 10, 2026" title="Good morning, Harini." description="Here's your money at a glance. One step at a time." action={<><button className="btn secondary" onClick={()=>setShowAssistant(true)}><Sparkles size={15}/> Money notes</button><button className="btn primary" onClick={()=>setShowAdd(true)}><Plus size={16}/> Add transaction</button></>}/>
    <div className="balance-hero"><div className="balance-copy"><div className="balance-label">TOTAL BALANCE <button className="eye-btn" onClick={()=>setHideMoney(!hideMoney)} title="Toggle balance visibility">{hideMoney?<Eye size={16}/>:<EyeOff size={16}/>}</button></div><div className="balance-amount">{money(284650)} <span className="balance-trend"><TrendingUp size={14}/> 8.4%</span></div><p>Across 2 accounts <span className="subtle-sep">·</span> Updated just now</p><div className="balance-links"><button onClick={()=>setPage("Transactions")}>View activity <ArrowRight size={14}/></button><button onClick={()=>setShowAdd(true)}><Plus size={14}/> Add money movement</button></div></div><div className="balance-art"><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="art-card back-card"/><div className="art-card front-card"><div className="card-top"><span>fermor</span><span>•••• 2084</span></div><div className="card-chip"/><div className="card-bottom"><span>EVERYDAY</span><span>VISA</span></div></div><div className="art-star star-one">✳</div><div className="art-star star-two">✳</div></div></div>
    <div className="metric-grid"><Metric label="Money in" amount={money(77000)} change="+12.8%" note="vs last month" icon={ArrowDownLeft} tone="green"/><Metric label="Money out" amount={money(35800)} change="−6.2%" note="vs last month" icon={ArrowUpRight} tone="orange"/><Metric label="Saved this month" amount={money(41200)} change="+18.4%" note="vs last month" icon={PiggyBank} tone="blue"/><Metric label="Budget left" amount={money(Math.max(0,budgetTotal-budgetSpent))} change={`${Math.max(0,Math.round((budgetTotal-budgetSpent)/budgetTotal*100))}%`} note="of monthly limits" icon={Wallet} tone="purple"/></div>
    <div className="content-grid overview-grid">
      <section className="panel cashflow-panel"><div className="panel-heading"><div><h2>Cash flow</h2><p>Income and spending over time</p></div><select value={range} onChange={e=>setRange(e.target.value)} className="compact-select"><option>6 months</option><option>3 months</option><option>12 months</option></select></div><div className="chart-legend"><span><i className="legend-income"/> Money in</span><span><i className="legend-expense"/> Money out</span><span className="legend-total">Net positive <b>{money(41200)}</b></span></div><div className="cash-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={range==="3 months"?chartData.slice(-3):range==="12 months"?[...chartData,{month:"Nov",income:75000,expenses:42000},{month:"Dec",income:78000,expenses:44900},{month:"Jan",income:73000,expenses:38500},{month:"Feb",income:79000,expenses:40100},{month:"Mar",income:80000,expenses:42500},{month:"Apr",income:77000,expenses:39000}]:chartData} margin={{top:8,right:6,left:-18,bottom:0}}><defs><linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#719879" stopOpacity={0.22}/><stop offset="95%" stopColor="#719879" stopOpacity={0}/></linearGradient><linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e0b37b" stopOpacity={0.18}/><stop offset="95%" stopColor="#e0b37b" stopOpacity={0}/></linearGradient></defs><CartesianGrid vertical={false} stroke="var(--chart-grid)" strokeDasharray="3 5"/><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill:"var(--muted)",fontSize:11}} dy={9}/><YAxis tickFormatter={v=>`${Math.round(v/1000)}k`} axisLine={false} tickLine={false} tick={{fill:"var(--muted)",fontSize:11}}/><Tooltip formatter={v=>fmt(v)} contentStyle={{borderRadius:12,border:"1px solid var(--line)",background:"var(--panel)",color:"var(--text)",fontSize:12}}/><Area type="monotone" dataKey="income" name="Money in" stroke="#638d6d" strokeWidth={2.5} fill="url(#incomeFill)" activeDot={{r:4}}/><Area type="monotone" dataKey="expenses" name="Money out" stroke="#d5a46d" strokeWidth={2.5} fill="url(#expenseFill)" activeDot={{r:4}}/></AreaChart></ResponsiveContainer></div></section>
      <section className="panel spending-panel"><div className="panel-heading"><div><h2>Where it goes</h2><p>Your spending breakdown</p></div><button className="subtle-link" onClick={()=>setPage("Budgets")}>Details <ArrowRight size={14}/></button></div><div className="donut-wrap"><div className="donut-chart"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={expenseData} dataKey="value" nameKey="name" innerRadius={63} outerRadius={83} paddingAngle={4} stroke="none">{expenseData.map((d,i)=><Cell key={i} fill={d.color}/>)}</Pie><Tooltip formatter={v=>fmt(v)} contentStyle={{borderRadius:10,border:"1px solid var(--line)",background:"var(--panel)",color:"var(--text)",fontSize:12}}/></PieChart></ResponsiveContainer><div className="donut-center"><span>OCTOBER</span><b>{money(35800)}</b><small>spent so far</small></div></div></div><div className="spend-legend">{expenseData.map(d=><div className="spend-row" key={d.name}><span><i style={{background:d.color}}/>{d.name}</span><b>{money(d.value)}</b></div>)}</div></section>
    </div>
    <div className="content-grid lower-grid">
      <section className="panel transactions-panel"><div className="panel-heading"><div><h2>Recent activity</h2><p>Your latest money movements</p></div><button className="subtle-link" onClick={()=>setPage("Transactions")}>All transactions <ArrowRight size={14}/></button></div><TransactionTable transactions={transactions.slice(0,5)} compact/></section>
      <section className="panel budgets-panel"><div className="panel-heading"><div><h2>Budget check-in</h2><p>A little awareness goes a long way</p></div><button className="icon-btn" onClick={()=>setPage("Budgets")}><ArrowRight size={17}/></button></div><div className="budget-mini-list">{budgets.slice(0,4).map(b=><BudgetLine key={b.name} budget={b}/>)}</div><button className="outline-link full" onClick={()=>setPage("Budgets")}>Review all budgets <ArrowRight size={14}/></button></section>
    </div>
    <section className="goal-strip"><div className="goal-strip-icon"><Target size={23}/></div><div className="goal-strip-copy"><span className="eyebrow">KEEP YOUR MOMENTUM</span><h3>Your goals are taking shape.</h3><p>{goals.length} goals in progress · {money(goalsSaved)} saved so far</p></div><div className="goal-strip-progress"><div className="progress-meta"><span>Overall progress</span><b>{Math.round(goalsSaved/goalsTarget*100)}%</b></div><div className="progress-track"><span style={{width:`${goalsSaved/goalsTarget*100}%`}}/></div></div><button className="btn secondary" onClick={()=>setPage("Savings goals")}>See goals <ArrowRight size={15}/></button></section>
  </>;
}
function Metric({label,amount,change,note,icon:Icon,tone}) {return <div className="metric-card"><div className={`metric-icon ${tone}`}><Icon size={18}/></div><div className="metric-label">{label}</div><div className="metric-amount">{amount}</div><div className="metric-foot"><span className={tone==="orange"?"change-warm":"change-positive"}>{change}</span><span>{note}</span></div></div>}
function TransactionTable({transactions,compact=false}) {
  return <div className="table-scroll"><table className="transaction-table"><thead><tr><th>TRANSACTION</th><th>CATEGORY</th><th>DATE</th><th className="amount-cell">AMOUNT</th></tr></thead><tbody>{transactions.length===0?<tr><td colSpan="4" className="empty-state">No transactions found. Try a different search.</td></tr>:transactions.map(t=><tr key={t.id}><td><div className="transaction-name"><div className={`txn-icon ${t.type==="income"?"txn-income":""}`}>{t.type==="income"?<ArrowDownLeft size={16}/>:t.icon}</div><div><b>{t.name}</b><small>{t.account}</small></div></div></td><td><span className="category-pill">{t.category}</span></td><td className="date-cell">{t.date}</td><td className={`amount-cell ${t.type==="income"?"amount-positive":""}`}>{t.type==="income"?"+":"−"}{fmt(Math.abs(t.amount))}</td></tr>)}</tbody></table></div>
}
function BudgetLine({budget,large=false}) {const pct=Math.round(budget.spent/budget.limit*100);return <div className={`budget-line ${large?"large":""}`}><div className="budget-line-top"><div className="budget-name"><i style={{background:budget.color}}/>{budget.name}</div><div className="budget-numbers"><b>{fmt(budget.spent)}</b><span> of {fmt(budget.limit)}</span></div></div><div className="progress-track"><span style={{width:`${Math.min(pct,100)}%`,background:budget.color}}/></div><div className="budget-line-foot"><span>{pct>=100?"Limit reached":pct>=85?"Nearly at limit":`${fmt(Math.max(0,budget.limit-budget.spent))} left`}</span><b className={pct>=85?"warning-text":""}>{pct}%</b></div></div>}
function Transactions({transactions,search,setSearch,filter,setFilter,setShowAdd,exportCSV}) {
  return <><PageHeading eyebrow="YOUR MONEY" title="Transactions" description="Every in and out, in one tidy timeline." action={<><button className="btn secondary" onClick={exportCSV}><Download size={15}/> Export CSV</button><button className="btn primary" onClick={()=>setShowAdd(true)}><Plus size={16}/> Add transaction</button></>}/>
    <div className="panel transaction-page-panel"><div className="table-toolbar"><div className="search-field"><Search size={17}/><input placeholder="Search transactions…" value={search} onChange={e=>setSearch(e.target.value)}/>{search && <button onClick={()=>setSearch("")}><X size={14}/></button>}</div><div className="filter-group"><Filter size={15}/>{["All","Income","Expenses"].map(f=><button className={filter===f?"active":""} key={f} onClick={()=>setFilter(f)}>{f}</button>)}</div></div><div className="transaction-summary"><span>Showing <b>{transactions.length}</b> transactions</span><span>October 2026 <ChevronDown size={14}/></span></div><TransactionTable transactions={transactions}/><div className="table-foot"><span>Demo ledger · {transactions.length} records shown</span><span>Transactions are sample data</span></div></div>
  </>;
}
function Budgets({budgets,setBudgets,budgetSpent,budgetTotal,setShowBudget}) {
  const [budgetTab,setBudgetTab] = useState("All categories");
  return <><PageHeading eyebrow="PLAN WITH CONFIDENCE" title="Your monthly budgets" description="A flexible guide for your spending—not a set of rules." action={<button className="btn primary" onClick={()=>setShowBudget(true)}><Plus size={16}/> Add budget</button>}/>
    <div className="budget-summary-grid"><div className="panel budget-summary-card"><div className="summary-icon green"><Wallet size={18}/></div><span>Total budget</span><b>{fmt(budgetTotal)}</b><small>Across {budgets.length} categories</small></div><div className="panel budget-summary-card"><div className="summary-icon orange"><ArrowUpRight size={18}/></div><span>You've spent</span><b>{fmt(budgetSpent)}</b><small>{Math.round(budgetSpent/budgetTotal*100)}% of planned spend</small></div><div className="panel budget-summary-card"><div className="summary-icon blue"><PiggyBank size={18}/></div><span>Still available</span><b>{fmt(Math.max(0,budgetTotal-budgetSpent))}</b><small>For the rest of October</small></div></div>
    <div className="panel budget-detail-panel"><div className="panel-heading"><div><h2>Category breakdown</h2><p>October 1 – October 31, 2026</p></div><select className="compact-select"><option>October 2026</option><option>September 2026</option></select></div><div className="budget-tabs">{["All categories","On track","Needs attention"].map(t=><button className={budgetTab===t?"active":""} onClick={()=>setBudgetTab(t)} key={t}>{t}</button>)}</div><div className="budget-detail-list">{budgets.filter(b=>budgetTab==="All categories"||(budgetTab==="On track"?b.spent/b.limit<.85:b.spent/b.limit>=.85)).map(b=><div className="budget-detail-item" key={b.name}><div className="budget-detail-symbol" style={{background:`${b.color}20`,color:b.color}}>{b.name[0]}</div><div className="budget-detail-main"><div className="budget-detail-top"><b>{b.name}</b><span>{Math.round(b.spent/b.limit*100)}% used</span></div><div className="progress-track"><span style={{width:`${Math.min(100,b.spent/b.limit*100)}%`,background:b.color}}/></div><small>{b.spent/b.limit>=.85?"Worth keeping an eye on":`${fmt(Math.max(0,b.limit-b.spent))} left this month`}</small></div><div className="budget-detail-amount"><b>{fmt(b.spent)}</b><small>of {fmt(b.limit)}</small></div><button className="icon-btn" title="Increase monthly limit" onClick={()=>setBudgets(prev=>prev.map(x=>x.name===b.name?{...x,limit:x.limit+1000}:x))}><MoreHorizontal size={18}/></button></div>)}</div><div className="budget-tip"><div className="tip-icon"><Activity size={18}/></div><div><b>A gentle nudge</b><p>Shopping is close to its limit this month. A quick check before your next purchase can help you stay on track.</p></div></div></div>
  </>;
}
function Goals({goals,setGoals,setShowGoal}) {
  return <><PageHeading eyebrow="FUTURE YOU WILL THANK YOU" title="Savings goals" description="Small, steady steps can take you somewhere big." action={<button className="btn primary" onClick={()=>setShowGoal(true)}><Plus size={16}/> New goal</button>}/>
    <div className="goal-overview"><div><div className="goal-overview-label">TOTAL SAVED TOWARDS GOALS</div><b>{fmt(goals.reduce((s,g)=>s+g.saved,0))}</b><p>of {fmt(goals.reduce((s,g)=>s+g.target,0))} across {goals.length} goals</p></div><div className="goal-overview-art"><div className="sun-disc"/><div className="hill hill-a"/><div className="hill hill-b"/><div className="hill hill-c"/></div></div>
    <div className="goals-grid">{goals.map((g,i)=>{const pct=Math.min(100,Math.round(g.saved/g.target*100));return <div className="panel goal-card" key={g.id}><div className={`goal-illustration ${g.tone}`}><div className="goal-illustration-shape">{i===0?<ShieldCheck size={28}/>:i===1?<CreditCard size={28}/>:<Landmark size={28}/>}</div><span className="goal-status">{pct===100?"Complete":"In progress"}</span><button className="icon-btn" onClick={()=>setGoals(prev=>prev.filter(x=>x.id!==g.id))} title="Remove goal"><MoreHorizontal size={18}/></button></div><div className="goal-card-body"><span className="eyebrow">GOAL {String(i+1).padStart(2,"0")}</span><h3>{g.name}</h3><p className="goal-date"><CalendarDays size={14}/> Target · {g.due}</p><div className="goal-card-amount"><b>{fmt(g.saved)}</b><span>of {fmt(g.target)}</span></div><div className="progress-track"><span className={g.tone} style={{width:`${pct}%`}}/></div><div className="goal-progress-meta"><span>{pct}% saved</span><span>{fmt(Math.max(0,g.target-g.saved))} to go</span></div><button className="outline-link full" onClick={()=>setGoals(prev=>prev.map(x=>x.id===g.id?{...x,saved:Math.min(x.target,x.saved+1000)}:x))}><Plus size={14}/> Add ₹1,000 to goal</button></div></div>})}<button className="new-goal-card" onClick={()=>setShowGoal(true)}><div><Plus size={22}/></div><b>Make room for a new dream</b><span>Set a goal, then build it one step at a time.</span></button></div>
  </>;
}
function Insights({budgets,goals,expenses,income,setShowAssistant}) {
  const tight = [...budgets].sort((a,b)=>b.spent/b.limit-a.spent/b.limit)[0];
  return <><PageHeading eyebrow="A CLEARER PICTURE" title="Money insights" description="Useful patterns from your demo activity, without the noise." action={<button className="btn primary" onClick={setShowAssistant}><Sparkles size={15}/> Ask a money question</button>}/>
    <div className="insights-hero"><div><span className="insights-kicker"><Activity size={15}/> YOUR OCTOBER CHECK-IN</span><h2>You're building a clearer money habit.</h2><p>Your sample income is higher than your sample expenses. Keep the habit simple: notice, adjust, repeat.</p><div className="insight-hero-metrics"><div><span>Money in</span><b>{fmt(77000)}</b></div><div><span>Money out</span><b>{fmt(35800)}</b></div><div><span>Difference</span><b>{fmt(41200)}</b></div></div></div><div className="insight-ring"><div><b>74</b><span>wellness score</span></div></div></div>
    <div className="insights-grid"><div className="panel insight-card"><div className="insight-card-icon orange"><TrendingUp size={19}/></div><span className="eyebrow">SPENDING PATTERN</span><h3>{tight.name} is nearly at its limit.</h3><p>You've used {Math.round(tight.spent/tight.limit*100)}% of this category's monthly budget. Consider reviewing the next purchase.</p><button className="subtle-link" onClick={()=>{}}>Review spending <ArrowRight size={14}/></button></div><div className="panel insight-card"><div className="insight-card-icon green"><PiggyBank size={19}/></div><span className="eyebrow">SAVING HABIT</span><h3>Give your goals a regular rhythm.</h3><p>{goals.length} goals are in progress. An automatic monthly transfer can help make progress more consistent.</p><button className="subtle-link" onClick={()=>{}}>See savings goals <ArrowRight size={14}/></button></div><div className="panel insight-card"><div className="insight-card-icon blue"><ShieldCheck size={19}/></div><span className="eyebrow">FINANCIAL WELLNESS</span><h3>Know your score, know your next step.</h3><p>This illustrative score looks at budget use, savings progress and cash-flow balance. It is not a credit score.</p><div className="wellness-bar"><span style={{width:"74%"}}/></div><b className="wellness-label">74 / 100 · Steady start</b></div></div>
    <div className="panel insights-note"><div className="note-icon"><CircleHelp size={18}/></div><div><b>How these insights work</b><p>These observations are calculated from the sample values in this prototype. They are educational prompts, not personalised financial advice or a credit assessment.</p></div></div>
  </>;
}
function Reports({transactions,exportCSV,selectedReport,setSelectedReport}) {
  const incomes=transactions.filter(t=>t.type==="income").reduce((s,t)=>s+t.amount,0), expenses=transactions.filter(t=>t.type==="expense").reduce((s,t)=>s+Math.abs(t.amount),0);
  return <><PageHeading eyebrow="LOOK BACK, MOVE FORWARD" title="Reports" description="A straightforward summary of your money over time." action={<button className="btn primary" onClick={exportCSV}><Download size={15}/> Download CSV</button>}/>
    <div className="report-toolbar"><div><CalendarDays size={17}/><span>Report period</span></div><select className="compact-select" value={selectedReport} onChange={e=>setSelectedReport(e.target.value)}><option>October 2026</option><option>September 2026</option><option>August 2026</option></select></div>
    <div className="report-summary-grid"><div className="panel report-total"><span>Income recorded</span><b className="amount-positive">+{fmt(incomes)}</b><small>From {transactions.filter(t=>t.type==="income").length} entries</small></div><div className="panel report-total"><span>Expenses recorded</span><b>−{fmt(expenses)}</b><small>Across {transactions.filter(t=>t.type==="expense").length} entries</small></div><div className="panel report-total"><span>Net movement</span><b className="amount-positive">{fmt(incomes-expenses)}</b><small>Income minus expenses</small></div></div>
    <div className="content-grid report-grid"><div className="panel"><div className="panel-heading"><div><h2>Monthly summary</h2><p>Based on demo transactions</p></div></div><div className="report-bars"><div className="report-bar-row"><span>Income</span><div className="report-bar-bg"><i style={{width:"100%"}}/></div><b>{fmt(incomes)}</b></div><div className="report-bar-row"><span>Expenses</span><div className="report-bar-bg expense"><i style={{width:`${Math.min(100,expenses/incomes*100)}%`}}/></div><b>{fmt(expenses)}</b></div></div><div className="report-insight"><Check size={17}/><span>You're spending less than the income recorded in this demo period.</span></div></div><div className="panel report-download"><div className="download-art"><FileText size={30}/></div><h3>Take your data with you.</h3><p>Export transaction records as a CSV to open in Excel or Google Sheets.</p><button className="btn secondary full" onClick={exportCSV}><Download size={15}/> Export transactions</button><small>CSV export contains sample transaction data.</small></div></div>
  </>;
}
function Recurring({flash}) {
  const [items,setItems] = useState([{id:1,name:"Netflix",category:"Subscriptions",amount:649,day:"8th of every month",color:"red",active:true},{id:2,name:"Mobile plan",category:"Utilities",amount:499,day:"12th of every month",color:"blue",active:true},{id:3,name:"Music streaming",category:"Subscriptions",amount:119,day:"18th of every month",color:"purple",active:true},{id:4,name:"Cloud storage",category:"Digital services",amount:199,day:"24th of every month",color:"green",active:false}]);
  const [adding,setAdding]=useState(false), [name,setName]=useState(""), [amount,setAmount]=useState("");
  const total=items.filter(i=>i.active).reduce((s,i)=>s+i.amount,0);
  return <><PageHeading eyebrow="THE REGULAR STUFF" title="Recurring bills" description="Keep the predictable costs from becoming surprises." action={<button className="btn primary" onClick={()=>setAdding(true)}><Plus size={16}/> Add recurring bill</button>}/>
    <div className="recurring-summary"><div className="recurring-summary-icon"><CalendarDays size={21}/></div><div><span>ACTIVE MONTHLY COMMITMENTS</span><b>{fmt(total)}</b><small>{items.filter(i=>i.active).length} active payments in your demo list</small></div><div className="recurring-summary-right"><span>Estimated yearly total</span><b>{fmt(total*12)}</b></div></div>
    <div className="panel recurring-list"><div className="panel-heading"><div><h2>Your regular payments</h2><p>Toggle a payment to include or exclude it from the estimate.</p></div><span className="category-pill">{items.filter(i=>i.active).length} active</span></div>{items.map(i=><div className={`recurring-item ${!i.active?"inactive":""}`} key={i.id}><div className={`recurring-logo ${i.color}`}>{i.name[0]}</div><div className="recurring-info"><b>{i.name}</b><span>{i.category} <i>·</i> Due on the {i.day}</span></div><div className="recurring-amount"><b>{fmt(i.amount)}</b><small>per month</small></div><button className={`toggle ${i.active?"on":""}`} aria-label={`Toggle ${i.name}`} onClick={()=>setItems(prev=>prev.map(x=>x.id===i.id?{...x,active:!x.active}:x))}><span/></button></div>)}</div>
    {adding && <Modal title="Add recurring bill" subtitle="Create a local reminder entry." onClose={()=>setAdding(false)}><form className="modal-form" onSubmit={e=>{e.preventDefault();if(!name.trim()||Number(amount)<=0)return;setItems(prev=>[...prev,{id:Date.now(),name,category:"Other",amount:Number(amount),day:"Choose due date",color:"blue",active:true}]);setName("");setAmount("");setAdding(false);flash("Recurring bill added.")}}><label>Bill or subscription<input required value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Internet plan"/></label><label>Monthly amount (₹)<input required type="number" min="1" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="999"/></label><div className="modal-actions"><button type="button" className="btn secondary" onClick={()=>setAdding(false)}>Cancel</button><button className="btn primary">Add bill</button></div></form></Modal>}
  </>;
}
function Modal({title,subtitle,onClose,children}) {return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><div className="modal-card"><div className="modal-head"><div><h2>{title}</h2><p>{subtitle}</p></div><button className="icon-btn" onClick={onClose}><X size={19}/></button></div>{children}</div></div>}
createRoot(document.getElementById("root")).render(<App/>);
