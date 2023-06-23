import React from "react";
import styles from "../../styles/styles";

const Sponsor = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}
    >
      <div className="flex justify-between w-full">
        <div className="flex items-start">
          <img
            src="https://logolook.net/wp-content/uploads/2022/08/Whiskas-Emblem.png"
            alt=""
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://cdn.shopify.com/s/files/1/0525/2395/8430/collections/Me-O_600x600_crop_center.png?v=1630555211"
            alt=""
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://static.wixstatic.com/media/5bf6be_e870721eef87434480f4334282e9a25d~mv2.png/v1/fill/w_318,h_159,al_c,q_90/file.jpg"
            alt=""
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://cms.cppetindo.com/wp-content/uploads/1.png"
            alt=""
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://seeklogo.com/images/P/Pedigree-logo-0B0352F571-seeklogo.com.png"
            alt=""
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://allvectorlogo.com/img/2023/03/purina-logo-vector.png"
            alt=""
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Sponsor;
