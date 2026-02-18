import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ArticleExample() {
  const handleCopy = () => {
    const element = document.getElementById("formatted-text");
    if (element) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(element);
      selection?.removeAllRanges();
      selection?.addRange(range);
      document.execCommand("copy");
      selection?.removeAllRanges();

      // Show feedback
      alert(
        "Teks berhasil disalin! Sekarang buka Word dan paste sesuai instruksi.",
      );
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">

      <Card className="mb-6">
        <CardHeader>Latihan Paste Formatting di Microsoft Word</CardHeader>
        <CardContent>
          {/* Formatted Text Box */}
          <div
            id="formatted-text"
            className="border-2 border-dashed border-gray-300 p-6 rounded-lg mb-4 bg-gradient-to-r from-blue-50 to-purple-50"
            style={{
              fontFamily: "Georgia, serif",
              lineHeight: "1.8",
            }}
          >
            <p style={{ fontSize: "16px", textAlign: "justify" }}>
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#1e40af",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                Microsoft Word
              </span>{" "}
              adalah{" "}
              <strong style={{ color: "#dc2626" }}>
                aplikasi pengolah kata
              </strong>{" "}
              yang sangat <em style={{ color: "#059669" }}>populer</em> di
              seluruh dunia. Program ini memiliki berbagai{" "}
              <span
                style={{
                  backgroundColor: "#fef08a",
                  padding: "2px 6px",
                  fontWeight: "600",
                }}
              >
                fitur canggih
              </span>{" "}
              untuk membantu pengguna membuat dokumen profesional. Dengan Word,
              kita dapat melakukan{" "}
              <u style={{ color: "#7c3aed" }}>formatting teks</u>, menambahkan{" "}
              <strong>gambar</strong>, membuat <em>tabel</em>, dan masih banyak
              lagi.
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#ea580c",
                  fontFamily: "Courier New, monospace",
                }}
              >
                {" "}
                Kemampuan paste dengan format yang tepat
              </span>{" "}
              adalah salah satu{" "}
              <span style={{ textDecoration: "line-through" }}>
                keterampilan dasar
              </span>{" "}
              <strong style={{ color: "#16a34a", fontSize: "18px" }}>
                keterampilan penting
              </strong>{" "}
              yang harus dikuasai setiap pengguna Word.
            </p>
          </div>

          <Button onClick={handleCopy} className="w-full mb-4">
            <Copy className="mr-2 h-4 w-4" />
            Salin Teks dengan Format
          </Button>
        </CardContent>
      </Card>

      {/* Comparison Card */}
      <Card className="bg-purple-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-700">
            🔍 Perbandingan Hasil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-purple-900 mb-2">
                Keep Source Formatting:
              </h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Mempertahankan semua warna, font, dan ukuran teks</li>
                <li>Bold, italic, underline tetap ada</li>
                <li>Background color dan highlight terjaga</li>
                <li>
                  Cocok untuk copy-paste dari web atau dokumen lain dengan
                  format yang ingin dipertahankan
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-purple-900 mb-2">
                Keep Text Only:
              </h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Menghapus SEMUA formatting</li>
                <li>
                  Teks menjadi polos, mengikuti format default dokumen Word
                </li>
                <li>Tidak ada warna, bold, italic, atau dekorasi lainnya</li>
                <li>
                  Cocok ketika hanya ingin mengambil isi teks tanpa format
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips Section */}
      <Card className="mt-6 bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-yellow-800">💡 Tips Tambahan</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>
            <strong>Keyboard Shortcut:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <kbd className="px-2 py-1 bg-white rounded border">Ctrl + V</kbd>{" "}
              - Paste dengan format default
            </li>
            <li>
              <kbd className="px-2 py-1 bg-white rounded border">
                Ctrl + Alt + V
              </kbd>{" "}
              - Membuka dialog Paste Special untuk opsi lebih lengkap
            </li>
            <li>
              Setelah paste, klik ikon <strong>Paste Options</strong> yang
              muncul untuk mengubah format
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
