import { meetings } from "@/data/meetings";
import { useNavigate } from "react-router-dom";
import { Monitor, ChevronRight, Clock, Layers } from "lucide-react";

const MeetingSelect = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Monitor size={20} className="text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-foreground leading-tight">
              Microsoft Word
            </h1>
            <p className="text-xs text-muted-foreground font-medium">
              Guided Self Learning
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        <h2 className="text-2xl font-extrabold text-foreground mb-6">
          Pilih Pertemuan
        </h2>
        <div className="space-y-4">
          {meetings.map((m) => (
            <button
              key={m.id}
              onClick={() => navigate(`/${m.id}`)}
              className="w-full text-left p-5 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{m.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-extrabold text-foreground group-hover:text-primary transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium">
                    {m.subtitle}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {m.duration} menit
                    </span>
                    <span className="flex items-center gap-1">
                      <Layers size={12} /> {m.slides.length} slide
                    </span>
                  </div>
                </div>
                <ChevronRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MeetingSelect;
