import React from 'react';
import { banner } from '../../assets/images';

function AboutPage() {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Banner Image */}
            <div className="w-full bg-white">
                <img src={banner} alt="Banner" className="w-full object-cover h-64" />
            </div>

            {/* Title */}
            <div className="flex justify-center mt-5">
                <h1 className="text-3xl font-semibold text-gray-800">Về chúng tôi</h1>
            </div>

            {/* About Content */}
            <div className="max-w-3xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 mb-10">
                <p className="text-gray-700 leading-relaxed text-lg">
                    Tại góc phố nhỏ trong lòng Hồ Chí Minh, có một tiệm salon tóc nhỏ nhưng luôn rộn ràng tiếng cười và lời chào đón thân thiện. Tiệm tên là "HairHarmony" – nghe thật giản dị nhưng lại chứa đựng cả tấm lòng của chị Hồng, chủ tiệm và cũng là người thợ chính.
                    <br /><br />
                    Chị Hồng đã làm nghề hơn mười năm. Với đôi bàn tay khéo léo và trái tim đầy đam mê, chị đã biến mái tóc của bao người trở nên bồng bềnh, rạng rỡ. Đối với chị, mỗi khách hàng đều là một câu chuyện, và mái tóc của họ chính là một phần thể hiện của câu chuyện đó. Có người đến đây chỉ để cắt tỉa cho gọn gàng, nhưng cũng có người tìm đến để thay đổi, để khép lại một chương cũ và bắt đầu một hành trình mới.
                    <br /><br />
                    Vào một buổi chiều đông, một cô gái trẻ bước vào tiệm, ánh mắt thoáng nét buồn. Sau khi trò chuyện một hồi lâu với chị Hồng, cô gái kể về những tháng ngày căng thẳng vừa qua và quyết định thay đổi mái tóc để tìm chút niềm vui mới. Chị Hồng lắng nghe, hiểu được tâm trạng ấy, chị tư vấn cho cô một màu tóc sáng hơn, để tôn lên gương mặt và mang lại sự tự tin.
                    <br /><br />
                    Khi chiếc gương được đưa ra, cô gái nhìn ngắm mái tóc mới của mình với ánh mắt lấp lánh. Nụ cười của cô như sáng lên cả không gian tiệm. Chị Hồng cũng mỉm cười, vì chị biết mình không chỉ làm đẹp mà còn giúp người khác cảm thấy tốt hơn về chính mình.
                    <br /><br />
                    Với tiệm HairHarmony không đơn thuần là nơi cắt tóc mà còn là nơi lưu giữ những khoảnh khắc, nơi mà khách hàng đến để tìm thấy sự an ủi và lấy lại tinh thần.
                </p>
            </div>
        </div>
    );
}

export default AboutPage;
