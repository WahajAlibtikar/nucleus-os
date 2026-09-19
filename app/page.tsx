"use client";

import { useMemo, useState } from "react";
import {
  Brain,
  ChatCircleDots,
  CheckCircle,
  Clock,
  FileText,
  FolderOpen,
  Gauge,
  MagnifyingGlass,
  Plus,
  Sparkle,
  Stack,
  Tray,
  UploadSimple,
} from "@phosphor-icons/react";

type NavKey =
  | "overview"
  | "knowledge"
  | "chat"
  | "projects"
  | "decisions"
  | "sources"
  | "review";

const nav = [
  { key: "overview", label: "نظرة عامة", icon: Gauge },
  { key: "knowledge", label: "المعرفة", icon: Brain },
  { key: "chat", label: "اسأل الشركة", icon: ChatCircleDots },
  { key: "projects", label: "المشاريع", icon: FolderOpen },
  { key: "decisions", label: "القرارات", icon: CheckCircle },
  { key: "sources", label: "المصادر", icon: Stack },
  { key: "review", label: "قائمة المراجعة", icon: Tray },
] satisfies Array<{ key: NavKey; label: string; icon: typeof Gauge }>;

const knowledge = [
  { title: "الهوية والقصة", meta: "آخر تحديث قبل يومين", tag: "الشركة" },
  { title: "شريحة العملاء الأساسية", meta: "معتمد · 4 مصادر", tag: "العملاء" },
  { title: "نبرة العلامة التجارية", meta: "معتمد · الإصدار 1.2", tag: "العلامة" },
  { title: "سياسة الموافقات", meta: "مسودة تحتاج مراجعة", tag: "السياسات" },
];

const projects = [
  { name: "إطلاق المنتج الجديد", progress: 72, owner: "فريق المنتج" },
  { name: "موقع الشركة", progress: 46, owner: "التسويق" },
  { name: "قاعدة معرفة العملاء", progress: 83, owner: "نجاح العملاء" },
];

const decisions = [
  { title: "اعتماد التسعير السنوي", date: "18 سبتمبر", status: "معتمد" },
  { title: "توحيد نبرة التواصل", date: "16 سبتمبر", status: "معتمد" },
  { title: "أولوية سوق الشركات الصغيرة", date: "14 سبتمبر", status: "قيد المراجعة" },
];

export default function Home() {
  const [active, setActive] = useState<NavKey>("overview");
  const [query, setQuery] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "اسألني عن الشركة، العملاء، المشاريع أو القرارات. سأجيب بالاعتماد على المعرفة الموثقة داخل NucleusOS.",
    },
  ]);

  const title = useMemo(
    () => nav.find((item) => item.key === active)?.label ?? "نظرة عامة",
    [active]
  );

  function sendMessage() {
    const value = chatInput.trim();
    if (!value) return;
    setMessages((current) => [
      ...current,
      { role: "user", text: value },
      {
        role: "assistant",
        text: "بحسب المعرفة المعتمدة، التركيز الحالي هو توحيد الرسائل وتقليل القرارات غير الموثقة. هذه إجابة تجريبية في نسخة الـMVP، وسيتم ربطها بالمصادر الحقيقية لاحقًا.",
      },
    ]);
    setChatInput("");
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">N</div>
          <div>
            <strong>NucleusOS</strong>
            <span>Company Intelligence</span>
          </div>
        </div>

        <button className="new-btn">
          <Plus size={18} weight="bold" />
          إضافة معرفة
        </button>

        <nav className="nav-list">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => setActive(item.key)}
                className={active === item.key ? "nav-item active" : "nav-item"}
              >
                <Icon size={19} weight={active === item.key ? "fill" : "regular"} />
                <span>{item.label}</span>
                {item.key === "review" && <b>3</b>}
              </button>
            );
          })}
        </nav>

        <div className="workspace-card">
          <div className="workspace-icon">و</div>
          <div>
            <strong>وهج للابتكار</strong>
            <span>مساحة العمل الرئيسية</span>
          </div>
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div>
            <p className="eyebrow">مساحة عمل الشركة</p>
            <h1>{title}</h1>
          </div>

          <div className="top-actions">
            <label className="search">
              <MagnifyingGlass size={18} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث داخل معرفة الشركة..."
              />
            </label>
            <button className="icon-btn">
              <UploadSimple size={19} />
            </button>
            <div className="avatar">WA</div>
          </div>
        </header>

        {active === "overview" && (
          <div className="page-grid">
            <section className="hero-card">
              <div>
                <span className="pill">
                  <Sparkle size={15} weight="fill" />
                  Company Brain جاهز
                </span>
                <h2>كل معرفة شركتك، في مكان واحد يفهم السياق.</h2>
                <p>
                  اجمع المعلومات والقرارات والمشاريع والمصادر، ثم استخدم الذكاء
                  الاصطناعي للإجابة والعمل بناءً عليها.
                </p>
                <div className="hero-actions">
                  <button onClick={() => setActive("chat")} className="primary-btn">
                    <ChatCircleDots size={18} />
                    اسأل الشركة
                  </button>
                  <button onClick={() => setActive("knowledge")} className="secondary-btn">
                    تصفح المعرفة
                  </button>
                </div>
              </div>
              <div className="brain-orbit">
                <div className="orbit orbit-a" />
                <div className="orbit orbit-b" />
                <div className="brain-core">
                  <Brain size={48} weight="duotone" />
                </div>
              </div>
            </section>

            <section className="stats-grid">
              {[
                ["128", "سجل معرفة", FileText],
                ["14", "مصدر موثوق", Stack],
                ["7", "مشاريع نشطة", FolderOpen],
                ["3", "بانتظار المراجعة", Clock],
              ].map(([value, label, Icon]) => (
                <article className="stat-card" key={String(label)}>
                  <div className="stat-icon">
                    <Icon size={20} />
                  </div>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </article>
              ))}
            </section>

            <section className="panel panel-wide">
              <div className="panel-head">
                <div>
                  <p className="eyebrow">آخر ما تم توثيقه</p>
                  <h3>المعرفة الحديثة</h3>
                </div>
                <button onClick={() => setActive("knowledge")} className="text-btn">
                  عرض الكل
                </button>
              </div>
              <div className="knowledge-list">
                {knowledge.map((item) => (
                  <div className="knowledge-row" key={item.title}>
                    <div className="file-box">
                      <FileText size={20} />
                    </div>
                    <div className="knowledge-copy">
                      <strong>{item.title}</strong>
                      <span>{item.meta}</span>
                    </div>
                    <span className="tag">{item.tag}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="panel">
              <div className="panel-head">
                <div>
                  <p className="eyebrow">التنفيذ</p>
                  <h3>المشاريع النشطة</h3>
                </div>
              </div>
              <div className="project-list">
                {projects.map((project) => (
                  <div className="project-item" key={project.name}>
                    <div className="project-top">
                      <strong>{project.name}</strong>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="progress">
                      <i style={{ width: project.progress + "%" }} />
                    </div>
                    <small>{project.owner}</small>
                  </div>
                ))}
              </div>
            </section>

            <section className="panel">
              <div className="panel-head">
                <div>
                  <p className="eyebrow">الحوكمة</p>
                  <h3>أحدث القرارات</h3>
                </div>
              </div>
              <div className="decision-list">
                {decisions.map((decision) => (
                  <div className="decision-item" key={decision.title}>
                    <div className="decision-mark">
                      <CheckCircle size={18} weight="fill" />
                    </div>
                    <div>
                      <strong>{decision.title}</strong>
                      <span>
                        {decision.date} · {decision.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {active === "chat" && (
          <section className="chat-page">
            <div className="chat-intro">
              <span className="spark-icon">
                <Sparkle size={20} weight="fill" />
              </span>
              <h2>اسأل NucleusOS</h2>
              <p>إجابات مستندة إلى سياق شركتك، مع إمكانية إظهار المصدر لكل معلومة.</p>
            </div>
            <div className="chat-window">
              <div className="messages">
                {messages.map((message, index) => (
                  <div key={index} className={"message " + message.role}>
                    {message.text}
                    {message.role === "assistant" && index > 0 && (
                      <span className="source-chip">المصدر: سياسة الشركة · v1.2</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="composer">
                <textarea
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="مثال: ما هي أولوياتنا لهذا الربع؟"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <button onClick={sendMessage}>إرسال</button>
              </div>
            </div>
          </section>
        )}

        {active === "knowledge" && (
          <section className="single-page">
            <div className="section-headline">
              <div>
                <p className="eyebrow">Company Brain</p>
                <h2>قاعدة معرفة الشركة</h2>
                <p>معلومات منظمة يمكن للذكاء الاصطناعي الرجوع لها بثقة.</p>
              </div>
              <button className="primary-btn">
                <Plus size={18} />
                سجل جديد
              </button>
            </div>
            <div className="cards-grid">
              {knowledge
                .filter((item) =>
                  item.title.toLowerCase().includes(query.toLowerCase())
                )
                .map((item) => (
                  <article className="knowledge-card" key={item.title}>
                    <div className="knowledge-card-icon">
                      <FileText size={24} />
                    </div>
                    <span className="tag">{item.tag}</span>
                    <h3>{item.title}</h3>
                    <p>{item.meta}</p>
                    <button>فتح السجل</button>
                  </article>
                ))}
            </div>
          </section>
        )}

        {active === "projects" && (
          <section className="single-page">
            <div className="section-headline">
              <div>
                <p className="eyebrow">Workspace</p>
                <h2>المشاريع</h2>
                <p>اربط التنفيذ بالمعرفة والقرارات بدل بقاء السياق مشتتًا.</p>
              </div>
              <button className="primary-btn">
                <Plus size={18} /> مشروع جديد
              </button>
            </div>
            <div className="cards-grid">
              {projects.map((project) => (
                <article className="project-card" key={project.name}>
                  <div className="project-card-top">
                    <FolderOpen size={24} />
                    <span>{project.progress}%</span>
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.owner}</p>
                  <div className="progress large">
                    <i style={{ width: project.progress + "%" }} />
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {active === "decisions" && (
          <section className="single-page">
            <div className="section-headline">
              <div>
                <p className="eyebrow">Decision Memory</p>
                <h2>سجل القرارات</h2>
                <p>اعرف ماذا قررتم، لماذا، وعلى أي معلومات بُني القرار.</p>
              </div>
              <button className="primary-btn">
                <Plus size={18} /> توثيق قرار
              </button>
            </div>
            <div className="decision-table">
              {decisions.map((decision) => (
                <div className="decision-row" key={decision.title}>
                  <CheckCircle size={21} weight="duotone" />
                  <strong>{decision.title}</strong>
                  <span>{decision.date}</span>
                  <b>{decision.status}</b>
                </div>
              ))}
            </div>
          </section>
        )}

        {active === "sources" && (
          <section className="single-page">
            <div className="section-headline">
              <div>
                <p className="eyebrow">Sources</p>
                <h2>المصادر</h2>
                <p>ملفات وروابط ومراجع تغذي Company Brain.</p>
              </div>
            </div>
            <div className="upload-zone">
              <UploadSimple size={34} />
              <h3>اسحب ملفاتك هنا</h3>
              <p>PDF، DOCX، CSV، Markdown أو روابط داخلية.</p>
              <button className="secondary-btn">اختيار ملفات</button>
            </div>
          </section>
        )}

        {active === "review" && (
          <section className="single-page">
            <div className="section-headline">
              <div>
                <p className="eyebrow">Approval Layer</p>
                <h2>قائمة المراجعة</h2>
                <p>لا تدخل المعرفة الحساسة للنظام قبل اعتمادها.</p>
              </div>
            </div>
            <div className="review-list">
              {["سياسة الخصومات", "تعريف العميل المثالي", "رسالة المبيعات الجديدة"].map(
                (item, index) => (
                  <article className="review-card" key={item}>
                    <div>
                      <span className="review-number">0{index + 1}</span>
                      <h3>{item}</h3>
                      <p>أضيفت بواسطة فريق العمل · تحتاج اعتماد مالك المساحة</p>
                    </div>
                    <div className="review-actions">
                      <button className="approve">اعتماد</button>
                      <button className="reject">رفض</button>
                    </div>
                  </article>
                )
              )}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
