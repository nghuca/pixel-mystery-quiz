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

// 0. Tranh mẫu: Mừng Ngày Phụ Nữ Việt Nam 20/10 (24x24)
const WOMEN_DAY_LINES = [
  "........GG........GG....",
  "..GG...GRRG..GG..GRRG...",
  ".GEEG.GRRYRGGEEGGRRYRG..",
  ".GDG..GRRRG..GDG.GRRRG..",
  "..B...BBRRB...B..BBRRB..",
  "....BBPPPBBBB..BBPPPBBBB",
  "..BBPPPPPPPPBBBBPPPPPPPP",
  ".BPPPPPPPPPPPPPPPPPPPPP.",
  ".BPPPPPRRRRRRRRRRRRPPPP.",
  ".BPPPPRRRRRRRRRRRRRRPPP.",
  ".BPPYYYRYYYRRRRRYRYYYPB.",
  ".BPPRRYRYRYRRRRYYRYRYPB.",
  ".BPPYYYRYRYRYYRRYRYRYPB.",
  ".BPPYRRRYRYRRRRRYRYRYPB.",
  ".BPPYYYRYYYRRRRYYRYYYPB.",
  "..BPPPPPRRRRRRRRRRRRPPB.",
  "..BPPPPPRRRRRRRRRRRRPPB.",
  "...BBPPPPPPPPPPPPPPBB...",
  "....BBPPPPPPPPPPPPBB....",
  "..GG..BBPPPPPPPPBB..GG..",
  ".GEEG..BBPPPPPPBB..GEEG.",
  ".GRYRG...BBPPBB...GRYRG.",
  "..GDG.....BBBB.....GDG..",
  "........................"
];

const WOMEN_DAY_PALETTE = {
  '.': 'transparent',
  'B': '#4c0519', // Viền hạt dẻ đỏ thẫm
  'P': '#fb7185', // Hồng hoa đào
  'R': '#e11d48', // Đỏ hoa hồng
  'Y': '#fef08a', // Chữ '20 - 10' vàng tươi
  'G': '#16a34a', // Xanh lá
  'E': '#4ade80', // Xanh lá sáng
  'D': '#14532d'  // Xanh lá thẫm
};

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
    id: 'women-day-20-10',
    name: '🌸 Mừng Ngày 20/10 - Phụ Nữ Việt Nam',
    description: 'Tranh Pixel Trái Tim 20-10 cùng hoa rực rỡ và 20 câu đố vui ngày Phụ Nữ Việt Nam.',
    pixelArt: parseAsciiPixelArt(WOMEN_DAY_LINES, WOMEN_DAY_PALETTE),
    questions: [
      {
            "id": 1,
            "question": "Hai vị nữ anh hùng đầu tiên khởi nghĩa đánh đuổi quân Đông Hán vào năm 40 là ai?",
            "options": [
                  "Hai Bà Trưng",
                  "Bà Triệu và Bùi Thị Xuân",
                  "Lê Chân và Thánh Thiên",
                  "Ỷ Lan và Dương Vân Nga"
            ],
            "correctIndex": 0,
            "explanation": "Hai Bà Trưng (Trưng Trắc và Trưng Nhị) đã lãnh đạo cuộc khởi nghĩa năm 40 đánh đuổi quân Đông Hán."
      },
      {
            "id": 2,
            "question": "Câu nói nổi tiếng: \"Tôi chỉ muốn cưỡi cơn gió mạnh, đạp luồng sóng dữ, chém cá kình ở biển Đông...\" là của ai?",
            "options": [
                  "Trưng Trắc",
                  "Lê Chân",
                  "Bà Triệu",
                  "Bùi Thị Xuân"
            ],
            "correctIndex": 2,
            "explanation": "Đây là câu nói thể hiện khí phách quật cường bất khuất của nữ anh hùng Triệu Thị Trinh (Bà Triệu)."
      },
      {
            "id": 3,
            "question": "Ngày Phụ nữ Việt Nam 20/10 gắn liền với sự kiện thành lập tổ chức nào vào năm 1930?",
            "options": [
                  "Hội Liên hiệp Thanh niên Việt Nam",
                  "Hội Phụ nữ phản đế Việt Nam (nay là Hội Liên hiệp Phụ nữ Việt Nam)",
                  "Hội Chữ thập đỏ Việt Nam",
                  "Tổng Liên đoàn Lao động Việt Nam"
            ],
            "correctIndex": 1,
            "explanation": "Ngày 20/10/1930, Hội Phụ nữ phản đế Việt Nam được thành lập, đánh dấu mốc son lịch sử của phong trào phụ nữ Việt Nam."
      },
      {
            "id": 4,
            "question": "Nữ chiến sĩ cách mạng nào từng giữ chức Bí thư Thành ủy Sài Gòn – Chợ Lớn và lãnh đạo cuộc Khởi nghĩa Nam Kỳ năm 1940?",
            "options": [
                  "Nguyễn Thị Minh Khai",
                  "Hoàng Thị Ái",
                  "Lê Thị Riêng",
                  "Nguyễn Thị Nhỏ"
            ],
            "correctIndex": 0,
            "explanation": "Đồng chí Nguyễn Thị Minh Khai là Bí thư Thành ủy Sài Gòn – Chợ Lớn kiên trung bất khuất."
      },
      {
            "id": 5,
            "question": "Nữ anh hùng liệt sĩ trẻ tuổi quê ở Đất Đỏ, gắn liền với hình ảnh hoa lê-ki-ma tại Côn Đảo là ai?",
            "options": [
                  "Mạc Thị Bưởi",
                  "Võ Thị Sáu",
                  "Trần Thị Lý",
                  "Đặng Thùy Trâm"
            ],
            "correctIndex": 1,
            "explanation": "Chị Võ Thị Sáu hy sinh kiên cường tại Côn Đảo khi tuổi đời còn rất trẻ, gắn liền với hình ảnh hoa lê-ki-ma."
      },
      {
            "id": 6,
            "question": "Bác Hồ đã trao tặng phụ nữ Việt Nam 8 chữ vàng: \"Anh hùng – Bất khuất – ... – ...\". Hai cụm từ còn thiếu là gì?",
            "options": [
                  "Dịu dàng – Đảm đang",
                  "Trung hậu – Đảm đang",
                  "Thủy chung – Hiền thảo",
                  "Cần cù – Sáng tạo"
            ],
            "correctIndex": 1,
            "explanation": "Tám chữ vàng Bác Hồ trao tặng phụ nữ Việt Nam là: \"Anh hùng – Bất khuất – Trung hậu – Đảm đang\"."
      },
      {
            "id": 7,
            "question": "Trang phục truyền thống nào luôn xuất hiện trong \"Tuần lễ...\" tôn vinh vẻ đẹp phụ nữ Việt Nam dịp 20/10?",
            "options": [
                  "Áo tứ thân",
                  "Áo bà ba",
                  "Áo dài",
                  "Áo chàm"
            ],
            "correctIndex": 2,
            "explanation": "Áo dài là quốc phục truyền thống tôn vinh nét đẹp duyên dáng của người phụ nữ Việt Nam."
      },
      {
            "id": 8,
            "question": "Điền từ còn thiếu vào câu tục ngữ: \"Đàn ông xây nhà, đàn bà ..................\"",
            "options": [
                  "Giữ của cải",
                  "Xây tổ ấm",
                  "Lo bếp núc",
                  "Nuôi con ngoan"
            ],
            "correctIndex": 1,
            "explanation": "Câu tục ngữ quen thuộc: \"Đàn ông xây nhà, đàn bà xây tổ ấm\"."
      },
      {
            "id": 9,
            "question": "Người phụ nữ duy nhất đặt bút ký vào Hiệp định Paris năm 1973 về lập lại hòa bình ở Việt Nam là ai?",
            "options": [
                  "Nguyễn Thị Định",
                  "Nguyễn Thị Bình",
                  "Nguyễn Thị Thập",
                  "Hà Thị Khiết"
            ],
            "correctIndex": 1,
            "explanation": "Bà Nguyễn Thị Bình, nguyên Bộ trưởng Ngoại giao Chính phủ Cách mạng lâm thời Cộng hòa miền Nam Việt Nam, là người phụ nữ duy nhất ký Hiệp định Paris 1973."
      },
      {
            "id": 10,
            "question": "Câu hát \"Bao ngày mẹ ngóng, bao ngày mẹ trông, bao ngày mẹ mong con chào đời...\" nằm trong bài hát nào?",
            "options": [
                  "Bông hồng cài áo",
                  "Nhật ký của mẹ",
                  "Mẹ yêu",
                  "Ước mơ của mẹ"
            ],
            "correctIndex": 1,
            "explanation": "Đó là ca khúc \"Nhật ký của mẹ\" do nhạc sĩ Nguyễn Văn Chung sáng tác, ca ngợi tình mẫu tử thiêng liêng."
      },
      {
            "id": 11,
            "question": "Nguyên mẫu Tượng đài \"Bà mẹ Việt Nam Anh hùng\" tại tỉnh Quảng Nam là người mẹ nào?",
            "options": [
                  "Mẹ Nguyễn Thị Thứ",
                  "Mẹ Phạm Thị Ngư",
                  "Mẹ Trần Thị Viết",
                  "Mẹ Nguyễn Thị Rành"
            ],
            "correctIndex": 0,
            "explanation": "Mẹ Nguyễn Thị Thứ (xã Điện Thắng Trung, thị xã Điện Bàn, tỉnh Quảng Nam) có 9 người con ruột, 1 con rể và 2 cháu ngoại hy sinh."
      },
      {
            "id": 12,
            "question": "Điểm khác biệt lớn nhất giữa ngày lễ 20/10 và ngày lễ 08/03 là gì?",
            "options": [
                  "20/10 là ngày Quốc tế Phụ nữ, 08/03 là ngày Phụ nữ Việt Nam",
                  "08/03 là ngày Quốc tế Phụ nữ, còn 20/10 dành riêng tôn vinh Phụ nữ Việt Nam",
                  "20/10 chỉ dành cho các bà mẹ",
                  "Cả hai đều là ngày lễ quốc tế"
            ],
            "correctIndex": 1,
            "explanation": "Ngày 8/3 là ngày Quốc tế Phụ nữ, còn ngày 20/10 là ngày kỷ niệm dành riêng để tôn vinh Phụ nữ Việt Nam."
      },
      {
            "id": 13,
            "question": "Bài thơ \"Bánh trôi nước\" (\"Thân em vừa trắng lại vừa tròn...\") là tác phẩm của nữ sĩ nào?",
            "options": [
                  "Đoàn Thị Điểm",
                  "Bà Huyện Thanh Quan",
                  "Hồ Xuân Hương",
                  "Xuân Quỳnh"
            ],
            "correctIndex": 2,
            "explanation": "Nữ sĩ Hồ Xuân Hương - được tôn vinh là \"Bà chúa thơ Nôm\" - là tác giả của bài thơ Bánh trôi nước."
      },
      {
            "id": 14,
            "question": "Chiếc khăn kẻ ô vuông truyền thống gắn bó với hình ảnh phụ nữ miền Nam có tên là gì?",
            "options": [
                  "Khăn mỏ quạ",
                  "Khăn rằn Nam Bộ",
                  "Khăn piêu",
                  "Khăn đóng"
            ],
            "correctIndex": 1,
            "explanation": "Khăn rằn là nét đặc trưng mộc mạc của phụ nữ Nam Bộ và các nữ chiến sĩ kiên cường."
      },
      {
            "id": 15,
            "question": "Điền từ còn thiếu vào câu ca dao: \"Công cha như núi Thái Sơn / Nghĩa mẹ như ....................\"?",
            "options": [
                  "Biển rộng mênh mông",
                  "Nước trong nguồn chảy ra",
                  "Sông dài biển lớn",
                  "Ánh trăng sáng ngời"
            ],
            "correctIndex": 1,
            "explanation": "Câu ca dao trọn vẹn: \"Công cha như núi Thái Sơn / Nghĩa mẹ như nước trong nguồn chảy ra\"."
      },
      {
            "id": 16,
            "question": "Cụm từ \"Phái đẹp\" hay \"Một nửa thế giới\" thường được dùng để tôn vinh ai?",
            "options": [
                  "Trẻ em",
                  "Người cao tuổi",
                  "Phụ nữ",
                  "Nam giới"
            ],
            "correctIndex": 2,
            "explanation": "\"Phái đẹp\" và \"Một nửa thế giới\" là những cụm từ trang trọng dùng để tôn vinh phụ nữ."
      },
      {
            "id": 17,
            "question": "Trong các dịp lễ tôn vinh Mẹ và Phụ nữ, loài hoa nào phổ biến nhất tượng trưng cho tình yêu thương?",
            "options": [
                  "Hoa phượng",
                  "Hoa hồng",
                  "Hoa mai",
                  "Hoa dâm bụt"
            ],
            "correctIndex": 1,
            "explanation": "Hoa hồng là loài hoa phổ biến nhất tượng trưng cho tình cảm chân thành, sự trân trọng và tình yêu thương."
      },
      {
            "id": 18,
            "question": "Bài hát thiếu nhi quen thuộc nào mở đầu bằng câu: \"Lúc ở nhà mẹ cũng là cô giáo / Khi đến trường cô giáo như mẹ hiền\"?",
            "options": [
                  "Cô và mẹ",
                  "Bàn tay mẹ",
                  "Cho con",
                  "Cả nhà thương nhau"
            ],
            "correctIndex": 0,
            "explanation": "Đó là ca khúc \"Cô và mẹ\" do nhạc sĩ Phạm Tuyên sáng tác."
      },
      {
            "id": 19,
            "question": "Điền từ còn thiếu vào câu ca dao: \"Con dù lớn vẫn là con của mẹ / Đi hết đời lòng mẹ vẫn ....................\"?",
            "options": [
                  "Nhớ thương",
                  "Theo con",
                  "Bên con",
                  "Mong con"
            ],
            "correctIndex": 1,
            "explanation": "Hai câu thơ nổi tiếng của nhà thơ Chế Lan Viên trong bài thơ \"Con cò\": \"Con dù lớn vẫn là con của mẹ / Đi hết đời, lòng mẹ vẫn theo con\"."
      },
      {
            "id": 20,
            "question": "Vào ngày 20/10 tại trường học, học sinh thường gửi lời chúc mừng và tri ân tới những ai?",
            "options": [
                  "Chỉ các bạn nam trong lớp",
                  "Cô giáo, các cô nhân viên nhà trường và các bạn nữ",
                  "Chỉ thầy hiệu trưởng",
                  "Chỉ các vận động viên thể thao"
            ],
            "correctIndex": 1,
            "explanation": "Dịp 20/10 là ngày để học sinh tri ân cô giáo, các nữ cán bộ nhân viên nhà trường và gửi lời chúc tốt đẹp tới các bạn nữ trong lớp."
      }
]
  },
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
