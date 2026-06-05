// config.js

// Cấu hình chi tiết theo cấu trúc thư mục của bạn
const seasonConfig = [
    { name: "Mùa 1", folder: "m1", startEp: 1, endEp: 12 },
    { name: "Mùa 2", folder: "m2", startEp: 13, endEp: 24 },
    { name: "Mùa 3", folder: "m3", startEp: 25, endEp: 36 },
    { name: "Mùa 4", folder: "m4", startEp: 37, endEp: 48 },
    { name: "OVA", folder: "ova", startEp: 49, endEp: 50, epNames: ["OVA 1", "OVA 2"] }
];

const STORY_TITLE = "Tokyo Ghoul";
const STORAGE_KEY = "readChapters_" + STORY_TITLE;

// Hàm tiện ích: Chuyển đổi từ số Tập Tổng sang Đường Dẫn File tương ứng
// Ví dụ: Tập 51 -> "m2/1.html" | Tập 1 -> "m1/1.html"
function getPathFromEpNum(epNum) {
    for (let season of seasonConfig) {
        if (epNum >= season.startEp && epNum <= season.endEp) {
            // Số file tương đối trong thư mục đó (Ví dụ tập 51 thuộc Mùa 2 sẽ là file 1.html)
            let fileNum = epNum - season.startEp + 1;
            return `${season.folder}/${fileNum}.html`;
        }
    }
    return null;
}

// Hàm tiện ích: Trả về danh sách tập đã đọc dưới dạng mảng
function getReadChapters() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// Hàm lưu tập vừa đọc (Lưu số tập tổng cho đồng nhất)
function saveReadChapter(epNum) {
    let readChapters = getReadChapters();
    readChapters = readChapters.filter(ch => ch !== epNum);
    readChapters.push(epNum);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readChapters));
}

// --- BỔ SUNG VÀO CONFIG.JS ---

// Hàm tiện ích: Từ thư mục và tên file hiện tại, tính ngược lại Số Tập Tổng
// Ví dụ: folder="m2", fileNum=1 -> trả về Tập Tổng: 51
function getEpNumFromPath(folder, fileNum) {
    const season = seasonConfig.find(s => s.folder === folder);
    if (season) {
        return season.startEp + parseInt(fileNum) - 1;
    }
    return null;
}

// Hàm lấy tổng số tập của toàn bộ các mùa (dùng để làm thanh tiến trình hoặc hiển thị tổng)
function getTotalEpisodes() {
    if (seasonConfig.length === 0) return 0;
    return seasonConfig[seasonConfig.length - 1].endEp;
}