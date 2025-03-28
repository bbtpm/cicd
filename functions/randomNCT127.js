// functions/randomNCT127.js

exports.handler = async function(event, context) {
    // รายชื่อแนะนำของ NCT127 (สามารถปรับเปลี่ยนข้อมูลได้ตามต้องการ)
    const recommendations = [
      { song: "Cherry Bomb", album: "NCT 127" },
      { song: "Kick It", album: "NCT 127" },
      { song: "Regular", album: "NCT 127" },
      { song: "Simon Says", album: "NCT 127" },
      { song: "Limitless", album: "NCT 127" },
      { song: "Fire Truck", album: "NCT 127" }
    ];
  
    // สุ่มเลือกข้อมูล
    const randomIndex = Math.floor(Math.random() * recommendations.length);
    const recommendation = recommendations[randomIndex];
  
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recommendation)
    };
  };
  