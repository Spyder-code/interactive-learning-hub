import { meetings } from "@/data/meetings";
import { useNavigate } from "react-router-dom";
import {
  FiMonitor,
  FiChevronRight,
  FiClock,
  FiLayers,
  FiCheckCircle,
  FiLogOut,
  FiUser,
} from "react-icons/fi";
import { useQuizStore } from "@/stores/quizStore";
import { authAPI } from "@/services/api";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const MeetingSelect = () => {
  const navigate = useNavigate();
  const { getMeetingHistory, isMeetingCompleted } = useQuizStore();
  const { toast } = useToast();
  const user = authAPI.getCurrentUser();

  const handleLogout = () => {
    authAPI.logout();
    toast({
      title: "Logout Berhasil",
      description: "Anda telah keluar dari sistem",
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <FiMonitor size={20} className="text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h1 className="text-base font-extrabold text-foreground leading-tight">
              Microsoft Word
            </h1>
            <p className="text-xs text-muted-foreground font-medium">
              Guided Self Learning
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <FiUser size={14} />
                {user?.name || "User"}
              </p>
              <p className="text-xs text-muted-foreground">{user?.nim}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              title="Logout"
              className="hover:text-destructive"
            >
              <FiLogOut size={18} />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        <h2 className="text-2xl font-extrabold text-foreground mb-6">
          Pilih Pertemuan
        </h2>
        <div className="space-y-4">
          {meetings.map((m) => {
            const isCompleted = isMeetingCompleted(m.id);
            const history = getMeetingHistory(m.id);

            return (
              <button
                key={m.id}
                onClick={() => navigate(`/${m.id}`)}
                className="w-full text-left p-5 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all duration-200 group relative"
              >
                {isCompleted && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 border border-success/20">
                    <FiCheckCircle size={14} className="text-success" />
                    <span className="text-xs font-bold text-success">
                      {history?.percentage}%
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{m.icon}</span>
                  <div className="flex-1 min-w-0 pr-16">
                    <h3 className="text-lg font-extrabold text-foreground group-hover:text-primary transition-colors">
                      {m.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium">
                      {m.subtitle}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <FiClock size={12} /> {m.duration} menit
                      </span>
                      <span className="flex items-center gap-1">
                        <FiLayers size={12} /> {m.slides.length} slide
                      </span>
                      {isCompleted && history && (
                        <span className="flex items-center gap-1 text-success font-semibold">
                          ⏱️ Selesai dalam {history.durationMinutes} menit
                        </span>
                      )}
                    </div>
                  </div>
                  <FiChevronRight
                    size={20}
                    className="text-muted-foreground group-hover:text-primary transition-colors"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default MeetingSelect;
