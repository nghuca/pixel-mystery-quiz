/**
 * Dữ liệu mặc định: Bộ tranh Pixel Art mẫu và danh sách câu hỏi trắc nghiệm
 */

// Hàm tiện ích tạo bản đồ pixel 16x16 từ chuỗi ASCII ký hiệu
function parseAsciiPixelArt(lines, palette) {
  const pixels = [];
  const height = lines.length;
  const width = lines[0].length;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const char = lines[y][x];
      const color = palette[char] || '#1a1f36';
      pixels.push({ x, y, color, revealed: false });
    }
  }
  return { width, height, pixels };
}

// 1. Tranh mẫu: Trái Tim 8-Bit (16x16)
const HEART_LINES = [
  "................",
  "....BB....BB....",
  "...BRRB..BRRB...",
  "..BRRRRBBRRRRB..",
  "..BRWWRRRRRRRB..",
  ".BRWWPRRRRRRRRB.",
  ".BRWPRRRRRRRRRB.",
  ".BRRRRRRRRRRRRB.",
  "..BRRRRRRRRRRB..",
  "...BRRRRRRRRB...",
  "....BRRRRRRB....",
  ".....BRRRRB.....",
  "......BRRB......",
  ".......BB.......",
  "................",
  "................"
];

const HEART_PALETTE = {
  '.': 'transparent',
  'B': '#1e1b4b', // Đường viền tối
  'R': '#ef4444', // Đỏ tươi
  'P': '#f43f5e', // Hồng cánh sen
  'W': '#ffffff'  // Điểm sáng trắng
};

// 2. Tranh mẫu: Ngôi Sao Vàng (16x16)
const STAR_LINES = [
  "................",
  ".......YY.......",
  "......BYYB......",
  "......BYYB......",
  "..BBBBBYYBBBBB..",
  "...BYYYYYYYYYB..",
  "....BYEYYEYYB...",
  "....BYYYYYYYB...",
  ".....BYYYYYB....",
  "....BYYYYYYYB...",
  "...BYYBBYYBYYB..",
  "..BYYB..B..BYYB.",
  "..BBB.......BBB.",
  "................",
  "................",
  "................"
];

const STAR_PALETTE = {
  '.': 'transparent',
  'B': '#78350f', // Viền nâu đậm
  'Y': '#facc15', // Vàng rực rỡ
  'E': '#1e293b'  // Mắt đen đáng yêu
};

// 3. Tranh mẫu: Cúp Vô Địch (16x16)
const TROPHY_LINES = [
  "................",
  "...BBBBBBBBBB...",
  "..BYYYYYYYYYYB..",
  ".BYBBYYYYYYBBYB.",
  ".BYB.BYYYYB.BYB.",
  ".BYB.BYYYYB.BYB.",
  "..BBB.BYYB.BBB..",
  "......BYYB......",
  "......BYYB......",
  ".....BYYYYB.....",
  ".....BYYYYB.....",
  "....BBBBBBBB....",
  "...BYYYYYYYYYB..",
  "...BBBBBBBBBBB..",
  "................",
  "................"
];

const TROPHY_PALETTE = {
  '.': 'transparent',
  'B': '#451a03',
  'Y': '#fbbf24'
};

window.DEFAULT_PRESETS = [
  {
    id: 'heart',
    name: '❤️ Trái Tim 8-Bit',
    description: 'Bức tranh trái tim phong cách Arcade ấm áp và ngọt ngào.',
    pixelArt: parseAsciiPixelArt(HEART_LINES, HEART_PALETTE),
    questions: [
      {
        id: 1,
        question: 'Ngôn ngữ lập trình nào thường được gọi là "linh hồn của trang web tương tác"?',
        options: ['HTML', 'CSS', 'JavaScript', 'SQL'],
        correctIndex: 2,
        explanation: 'JavaScript là ngôn ngữ lập trình giúp trang web có thể phản hồi và tương tác với người dùng.'
      },
      {
        id: 2,
        question: 'Trong máy tính, 1 Byte tương đương với bao nhiêu Bit?',
        options: ['4 Bit', '8 Bit', '16 Bit', '32 Bit'],
        correctIndex: 1,
        explanation: '1 Byte tiêu chuẩn gồm đúng 8 Bit dữ liệu nhị phân (0 hoặc 1).'
      },
      {
        id: 3,
        question: 'Đơn vị nhỏ nhất cấu thành nên hình ảnh kỹ thuật số trên màn hình gọi là gì?',
        options: ['Voxel', 'Pixel', 'Vector', 'Bitrate'],
        correctIndex: 1,
        explanation: 'Pixel (viết tắt của Picture Element) là điểm ảnh nhỏ nhất tạo nên toàn bộ hình ảnh kỹ thuật số.'
      },
      {
        id: 4,
        question: 'Hành tinh nào gần Mặt Trời nhất trong Hệ Mặt Trời?',
        options: ['Sao Kim (Venus)', 'Sao Thủy (Mercury)', 'Sao Hỏa (Mars)', 'Trái Đất (Earth)'],
        correctIndex: 1,
        explanation: 'Sao Thủy là hành tinh nằm gần Mặt Trời nhất và cũng là hành tinh nhỏ nhất trong 8 hành tinh.'
      },
      {
        id: 5,
        question: 'Giao thức bảo mật mã hóa cho trình duyệt web phổ biến hiện nay là gì?',
        options: ['HTTP', 'HTTPS', 'FTP', 'SSH'],
        correctIndex: 1,
        explanation: 'HTTPS (Hypertext Transfer Protocol Secure) sử dụng chứng chỉ SSL/TLS để mã hóa dữ liệu truyền tải.'
      },
      {
        id: 6,
        question: 'Ai được mệnh danh là nữ lập trình viên đầu tiên trong lịch sử nhân loại?',
        options: ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton', 'Marie Curie'],
        correctIndex: 0,
        explanation: 'Ada Lovelace đã viết thuật toán đầu tiên chạy trên cỗ máy phân tích của Charles Babbage vào thế kỷ 19.'
      },
      {
        id: 7,
        question: 'Trong hệ màu RGB hiển thị màn hình, ba màu cơ bản là gì?',
        options: ['Đỏ, Vàng, Xanh lam', 'Đỏ, Xanh lá, Xanh lam', 'Hồng, Vàng, Trắng', 'Đỏ, Đen, Xanh'],
        correctIndex: 1,
        explanation: 'RGB viết tắt của Red (Đỏ), Green (Xanh lá cây) và Blue (Xanh lam).'
      },
      {
        id: 8,
        question: 'Mạng lưới mạng máy tính toàn cầu kết nối hàng triệu thiết bị được gọi là gì?',
        options: ['Intranet', 'LAN', 'Internet', 'Bluetooth'],
        correctIndex: 2,
        explanation: 'Internet là hệ thống mạng máy tính toàn cầu kết nối các máy tính và thiết bị thông minh trên khắp thế giới.'
      }
    ]
  },
  {
    id: 'star',
    name: '⭐ Ngôi Sao May Mắn',
    description: 'Ngôi sao vàng retro mang lại niềm vui và may mắn.',
    pixelArt: parseAsciiPixelArt(STAR_LINES, STAR_PALETTE),
    questions: [
      {
        id: 1,
        question: 'Loài động vật nào được xem là có kích thước lớn nhất từng tồn tại trên Trái Đất?',
        options: ['Khủng long bạo chúa', 'Cá voi xanh', 'Voi châu Phi', 'Mực khổng lồ'],
        correctIndex: 1,
        explanation: 'Cá voi xanh là sinh vật lớn nhất từng được biết đến, có thể dài hơn 30 mét và nặng tới 200 tấn.'
      },
      {
        id: 2,
        question: 'Nước đóng băng và chuyển thành đá ở nhiệt độ bao nhiêu độ C (dưới áp suất tiêu chuẩn)?',
        options: ['-5°C', '0°C', '4°C', '100°C'],
        correctIndex: 1,
        explanation: 'Ở áp suất 1 atm, nước tinh khiết đóng băng thành thể rắn tại nhiệt độ 0°C (32°F).'
      },
      {
        id: 3,
        question: 'Hình tam giác đều có ba góc bằng nhau, mỗi góc bằng bao nhiêu độ?',
        options: ['45 độ', '60 độ', '90 độ', '180 độ'],
        correctIndex: 1,
        explanation: 'Tổng 3 góc tam giác là 180 độ, vì vậy mỗi góc của tam giác đều bằng 180 : 3 = 60 độ.'
      },
      {
        id: 4,
        question: 'Khí nào chiếm tỷ lệ phần trăm lớn nhất trong bầu khí quyển Trái Đất?',
        options: ['Oxy (O2)', 'Nitơ (N2)', 'Cacbonic (CO2)', 'Hydro (H2)'],
        correctIndex: 1,
        explanation: 'Khí Nitơ chiếm khoảng 78% thể tích khí quyển, trong khi Oxy chiếm khoảng 21%.'
      },
      {
        id: 5,
        question: 'Tốc độ ánh sáng trong chân không xấp xỉ khoảng bao nhiêu?',
        options: ['300.000 m/s', '300.000 km/s', '150.000 km/s', '1.000.000 km/s'],
        correctIndex: 1,
        explanation: 'Ánh sáng di chuyển trong chân không với tốc độ xấp xỉ 299.792 km/giây (~300.000 km/s).'
      },
      {
        id: 6,
        question: 'Thủ đô của đất nước Nhật Bản là thành phố nào?',
        options: ['Osaka', 'Kyoto', 'Tokyo', 'Hiroshima'],
        correctIndex: 2,
        explanation: 'Tokyo là thủ đô và là trung tâm kinh tế, chính trị sầm uất hàng đầu của Nhật Bản.'
      },
      {
        id: 7,
        question: 'Cây cầu vàng nổi tiếng được nâng bởi hai bàn tay khổng lồ nằm ở địa danh nào của Việt Nam?',
        options: ['Đà Lạt', 'Đà Nẵng (Bà Nà Hills)', 'Sa Pa', 'Nha Trang'],
        correctIndex: 1,
        explanation: 'Cầu Vàng thuộc khu du lịch Sun World Ba Na Hills tại thành phố Đà Nẵng.'
      },
      {
        id: 8,
        question: 'Một năm nhuận theo Dương lịch có tất cả bao nhiêu ngày?',
        options: ['364 ngày', '365 ngày', '366 ngày', '367 ngày'],
        correctIndex: 2,
        explanation: 'Năm nhuận có thêm ngày 29 tháng 2 nên tổng cộng có 366 ngày.'
      }
    ]
  },
  {
    id: 'trophy',
    name: '🏆 Cúp Vô Địch',
    description: 'Chiếc cúp vàng vinh quang dành cho người chiến thắng xuất sắc.',
    pixelArt: parseAsciiPixelArt(TROPHY_LINES, TROPHY_PALETTE),
    questions: [
      {
        id: 1,
        question: 'Đỉnh núi nào được công nhận là ngọn núi cao nhất thế giới so với mực nước biển?',
        options: ['K2', 'Everest', 'Fansipan', 'Phú Sĩ'],
        correctIndex: 1,
        explanation: 'Đỉnh Everest thuộc dãy Himalaya cao 8.848,86 m so với mực nước biển.'
      },
      {
        id: 2,
        question: 'Trò chơi cờ vua có tổng cộng bao nhiêu quân cờ trên bàn cờ khi bắt đầu?',
        options: ['24 quân', '32 quân', '36 quân', '64 quân'],
        correctIndex: 1,
        explanation: 'Mỗi bên có 16 quân cờ (tổng cộng 32 quân) thi đấu trên bàn cờ 64 ô vuông.'
      },
      {
        id: 3,
        question: 'Đại dương nào có diện tích lớn nhất trên Trái Đất?',
        options: ['Đại Tây Dương', 'Thái Bình Dương', 'Ấn Độ Dương', 'Bắc Băng Dương'],
        correctIndex: 1,
        explanation: 'Thái Bình Dương chiếm hơn 30% diện tích bề mặt Trái Đất và lớn hơn toàn bộ diện tích lục địa gộp lại.'
      },
      {
        id: 4,
        question: 'Số nguyên tố nhỏ nhất là số mấy?',
        options: ['0', '1', '2', '3'],
        correctIndex: 2,
        explanation: 'Số 2 là số nguyên tố nhỏ nhất và cũng là số nguyên tố chẵn duy nhất.'
      },
      {
        id: 5,
        question: 'Bức họa nổi tiếng "Nàng Mona Lisa" là kiệt tác của danh họa nào?',
        options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo'],
        correctIndex: 1,
        explanation: 'Leonardo da Vinci đã vẽ kiệt tác Mona Lisa vào thời kỳ Phục hưng Ý.'
      },
      {
        id: 6,
        question: 'Kim loại nào ở thể lỏng ở điều kiện nhiệt độ phòng bình thường?',
        options: ['Thủy ngân (Hg)', 'Chì (Pb)', 'Nhôm (Al)', 'Bạc (Ag)'],
        correctIndex: 0,
        explanation: 'Thủy ngân (Hg) là kim loại duy nhất duy trì trạng thái lỏng ở nhiệt độ phòng chuẩn.'
      },
      {
        id: 7,
        question: 'Quốc gia nào đăng cai kỳ Thế vận hội Olympic mùa hè 2024?',
        options: ['Nhật Bản', 'Pháp', 'Hoa Kỳ', 'Anh'],
        correctIndex: 1,
        explanation: 'Thế vận hội Olympic mùa hè 2024 diễn ra vô cùng ấn tượng tại thủ đô Paris, Pháp.'
      },
      {
        id: 8,
        question: 'Tác phẩm văn học "Truyện Kiều" bất hủ của Việt Nam do đại thi hào nào sáng tác?',
        options: ['Nguyễn Trãi', 'Hồ Xuân Hương', 'Nguyễn Du', 'Đoàn Thị Điểm'],
        correctIndex: 2,
        explanation: 'Đại thi hào dân tộc - Danh nhân văn hóa thế giới Nguyễn Du là tác giả của Đoạn trường tân thanh (Truyện Kiều).'
      }
    ]
  }
];
