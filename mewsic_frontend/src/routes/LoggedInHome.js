// import { useState } from "react";
// import { Howl, Howler } from "howler";
// import { Icon } from "@iconify/react";
// import mewsic_logo from "../assets/images/mewsic_logo.svg";
// import IconText from "../components/shared/IconText";
// import TextWithHover from "../components/shared/TextWithHover";
import LoggedInContainer from "../containers/LoggedInContainer";
import TrendingCard from "../components/shared/TrendingCard";

const focusCardsData = [
  {
    title: "Fall Music",
    description: "Fall with the smooth sounds of the season",
    imgUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Features125/v4/c4/07/2b/c4072b5c-a792-5955-7998-084cfbc845e7/U0MtTVMtV1ctQ2hlZnNfS2lzcy1BREFNX0lEPTE1MzU4Mjc0NTgucG5n.png/592x592SC.DN01.webp?l=en-US",
  },
  {
    title: "After Dinner Nap",
    description: "Relax with these laid-back acoustic tracks.",
    imgUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Features125/v4/dd/14/00/dd1400b4-3826-7bcf-a348-b4559870c08b/U0MtTVMtV1ctQWZ0ZXJfRGlubmVyX05hcC1BREFNX0lEPTE1MzExNDA4NzIucG5n.png/592x592SC.DN01.webp?l=en-US",
  },
  {
    title: "Instrumental Holiday",
    description: "Instrumental holiday favorites for the office",
    imgUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Features112/v4/4b/f4/6d/4bf46dbe-91c3-e64c-534b-ed6e06cddc9f/9533c539-ca65-4548-9b09-3bbc7e9d695a.png/592x592SC.CADC01.webp?l=en-US",
  },
  {
    title: "Chill Covers",
    description: "Chill like you never have before",
    imgUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Features112/v4/67/6d/29/676d2943-0d31-9914-5953-b1d41a3ff769/346871fc-1751-4079-8ac0-47835bc48e10.png/592x592SC.DN01.webp?l=en-US",
  },
  {
    title: "Sagittarius Season",
    description: "Celebrate Sagittarius season with these tracks",
    imgUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Features115/v4/fb/32/43/fb324374-3a85-7297-a3e5-4afc739b4482/U0MtTVMtVEVSLUZlZWxHb29kX1NhZ2l0dGFyaXVzU2Vhc29uLUFEQU1fSUQ9MTU3NTg1ODgxNy5wbmc.png/592x592SC.DN01.webp?l=en-US",
  },
];

const spotifyPlaylistsCardData = [
  {
    title: "Taylor Swift Essentials",
    description: "Tailored Swifties for you",
    imgUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Features126/v4/19/c1/e7/19c1e79d-17d7-d345-0859-1f571baf4b35/mza_17588248318350205547.png/592x592SC.FPESS03.webp?l=en-US",
  },
  {
    title: "Billie Eilish Essentials",
    description: "Eilish Essentials for you",
    imgUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Features125/v4/aa/64/c1/aa64c19b-b273-76ee-f785-05ee22555de4/pr_source.png/592x592SC.FPESS03.webp?l=en-US",
  },
  {
    title: "Sam Hunt Essentials",
    description: "Hunt you music spirit",
    imgUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages126/v4/82/d4/7e/82d47ee8-7678-6ddf-d8a0-7659465f6936/8680b5f5-fa98-461b-8912-8d7f885b90e4_ami-identity-861f7596b2fa83c8e0ca695dbfe57321-2023-03-07T19-29-02.018Z_cropped.png/592x592SC.FPESS03.webp?l=en-US",
  },
  {
    title: "Charlie Puth Essentials",
    description: "Puth your music on",
    imgUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/AMCArtistImages116/v4/42/ce/04/42ce04de-abfa-c9f4-c46c-f4a7defd5fcf/8c367458-cd76-452a-a6e4-e945ccd379c7_ami-identity-369af9b60942ad734b4d9e5e8a801af6-2023-08-21T17-34-34.802Z_cropped.png/592x592SC.FPESS03.webp?l=en-US",
  },
  {
    title: "King Princess Essentials",
    description: "Princess essentials for you",
    imgUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/bc/16/da/bc16dac8-6552-09a0-4476-53cc09db40f9/pr_source.png/592x592SC.FPESS03.webp?l=en-US",
  },
];

const Home = () => {
  return (
    <LoggedInContainer curActiveScreen="home">
      {/* <TrendingCard /> */}

      <PlaylistView titleText="Focus" cardsData={focusCardsData} />
      <PlaylistView
        titleText="Mewsic Artist Special"
        cardsData={spotifyPlaylistsCardData}
      />
      <PlaylistView titleText="Music by Mood" cardsData={focusCardsData} />
    </LoggedInContainer>
  );
};

const PlaylistView = ({ titleText, cardsData }) => {
  return (
    <div className="text-white mt-8">
      <div className="text-2xl font-semibold mb-5">{titleText}</div>
      <div className="w-full flex justify-between space-x-4">
        {
          // cardsData will be an array
          cardsData.map((item, index) => {
            return (
              <Card
                key={index}
                title={item.title}
                description={item.description}
                imgUrl={item.imgUrl}
              />
            );
          })
        }
      </div>
    </div>
  );
};

const Card = ({ title, description, imgUrl }) => {
  return (
    <div className="bg-transparent bg-opacity-40 w-1/5 p-4 rounded-lg">
      <div className="pb-4 pt-2">
        <img className="w-full rounded-lg" src={imgUrl} alt="label" />
      </div>
      <div className="text-white font-semibold py-3">{title}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
  );
};

export default Home;
