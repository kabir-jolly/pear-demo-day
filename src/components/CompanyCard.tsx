import React, { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import "./CompanyCard.css";

interface Founder {
  name: string;
  email: string;
  linkedIn: string;
  photo: string;
}

interface CompanyCardProps {
  logo: string;
  name: string;
  website: string;
  shortDescription: string;
  longDescription: string;
  pitchVideo: string;
  founders: Founder[];
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  logo,
  name,
  website,
  shortDescription,
  longDescription,
  pitchVideo,
  founders,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [founderPhotos, setFounderPhotos] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    const fetchImage = async (path: string) => {
      try {
        const storage = getStorage();
        const imageRef = ref(storage, path);
        return await getDownloadURL(imageRef);
      } catch (error) {
        console.error("Error fetching image:", error);
        return null;
      }
    };

    const fetchImages = async () => {
      const logoUrl = await fetchImage(logo);
      setLogoUrl(logoUrl);

      const founderPhotoUrls = await Promise.all(
        founders.map(async (founder) => {
          const photoUrl = await fetchImage(founder.photo);
          return { [founder.name]: photoUrl };
        })
      );

      setFounderPhotos(Object.assign({}, ...founderPhotoUrls));
    };

    fetchImages();
  }, [logo, founders]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`company-card ${isExpanded ? "expanded" : ""}`}
      onClick={toggleExpand}
    >
      <div className="card-header">
        {logoUrl ? (
          <img src={logoUrl} alt={`${name} logo`} className="company-logo" />
        ) : (
          <div className="company-logo-placeholder">Logo</div>
        )}
        <div className="card-title">
          <h2>{name}</h2>
          <p className="short-description">{shortDescription}</p>
        </div>
        <div className={`expand-arrow ${isExpanded ? "expanded" : ""}`}></div>
      </div>
      {isExpanded && (
        <div className="card-details">
          <p className="long-description">{longDescription}</p>
          <div className="card-links">
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="website-link"
            >
              Website
            </a>
            <a
              href={pitchVideo}
              target="_blank"
              rel="noopener noreferrer"
              className="pitch-video-link"
            >
              Pitch Video
            </a>
          </div>
          <div className="founders">
            {founders.map((founder, index) => (
              <div key={index} className="founder">
                {founderPhotos[founder.name] ? (
                  <img
                    src={founderPhotos[founder.name]}
                    alt={founder.name}
                    className="founder-photo"
                  />
                ) : (
                  <div className="founder-photo-placeholder">Photo</div>
                )}
                <div className="founder-info">
                  <p>{founder.name}</p>
                  <a href={`mailto:${founder.email}`}>{founder.email}</a>
                  <a
                    href={founder.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyCard;
