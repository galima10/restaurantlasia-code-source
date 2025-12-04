import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";

import "./styles/main.scss";

import NavBar from "@components/organisms/static/NavBar";
import Footer from "@components/organisms/static/Footer";

import FrontPageHero from "@components/organisms/static/FrontPageHero";
import GoogleReviewsSection from "@components/organisms/frontPage/GoogleReviewsSection";
import GallerySection from "@components/organisms/frontPage/GallerySection";
import LocalReviewSection from "@components/organisms/frontPage/LocalReviewSection";

import TwoImagesTextSection from "@components/organisms/general/TwoImagesTextSection";
import SimpleImageTextSection from "@components/organisms/general/SimpleImageTextSection";
import FlagShipProductsModuleSection from "@components/organisms/general/FlagShipProductsModuleSection";
import FAQSection from "@components/organisms/general/FAQSection";
import ReservationSection from "@components/organisms/general/ReservationSection";

import IntroductionSection from "@components/organisms/childrenPages/IntroductionSection";
import FlagShipProductSection from "@components/organisms/childrenPages/FlagShipProductSection";
import ProductsSection from "@components/organisms/childrenPages/ProductsSection";
import ComplexFourImagesSection from "@components/organisms/childrenPages/ComplexFourImagesSection";
import ComplexTripleImagesSection from "@components/organisms/childrenPages/ComplexTripleImagesSection";
import ComplexMessageFormSection from "@components/organisms/childrenPages/ComplexMessageFormSection";
import LocalReviewsListSection from "@components/organisms/childrenPages/LocalReviewsListSection";
import SimpleMessageFormSection from "@components/organisms/childrenPages/SimpleMessageFormSection";
import CTASection from "@components/organisms/childrenPages/CTASection";
import SimpleTextButtonSection from "@components/organisms/childrenPages/SimpleTextButtonSection";
import TextSection from "@components/organisms/childrenPages/TextSection";

import HeaderPageContainer from "@components/organisms/static/HeaderPageContainer";

import HeaderSection from "@components/organisms/productPage/HeaderSection";
import ProductImagesSection from "@components/organisms/productPage/ProductImagesSection";
import DescriptionSection from "@components/organisms/productPage/DescriptionSection";
import NavigationSection from "@components/organisms/productPage/NavigationSection";

// Crée un tableau de composants avec leurs conteneurs
const components = [
  { id: "react-navbar", component: <NavBar /> },
  {
    id: "react-footer",
    component: <Footer />,
  },
  { id: "react-frontpagehero", component: <FrontPageHero /> },
  { id: "react-twoimagestextsection", component: <TwoImagesTextSection /> },
  { id: "react-simpleimagetextsection", component: <SimpleImageTextSection /> },
  {
    id: "react-flagshipproductsmodulesection",
    component: <FlagShipProductsModuleSection />,
  },
  { id: "react-googlereviewssection", component: <GoogleReviewsSection /> },
  { id: "react-gallerysection", component: <GallerySection /> },
  {
    id: "react-localreviewssection",
    component: <LocalReviewSection />,
  },
  { id: "react-faqsection", component: <FAQSection /> },
  { id: "react-reservationsection", component: <ReservationSection /> },
  {
    id: "react-introductionsection1",
    component: <IntroductionSection type="disposition1" />,
  },
  {
    id: "react-introductionsection2",
    component: <IntroductionSection type="disposition2" />,
  },
  { id: "react-flagshipproductsection", component: <FlagShipProductSection /> },
  { id: "react-productssection", component: <ProductsSection /> },
  {
    id: "react-complexfourimagessection",
    component: <ComplexFourImagesSection />,
  },
  {
    id: "react-complextripleimagessection",
    component: <ComplexTripleImagesSection />,
  },
  {
    id: "react-complexmessageformsection",
    component: <ComplexMessageFormSection />,
  },
  {
    id: "react-localreviewslistsection",
    component: <LocalReviewsListSection />,
  },
  {
    id: "react-simplemessageformsection",
    component: <SimpleMessageFormSection />,
  },
  { id: "react-ctasection", component: <CTASection /> },
  {
    id: "react-simpletextbuttonsection",
    component: <SimpleTextButtonSection />,
  },
  { id: "react-headerpagecontainer", component: <HeaderPageContainer /> },
  { id: "react-textsection", component: <TextSection /> },
  {
    id: "react-headersection",
    component: <HeaderSection />,
  },
  {
    id: "react-productimagessection",
    component: <ProductImagesSection />,
  },
  {
    id: "react-descriptionsection",
    component: <DescriptionSection />,
  },
  { id: "react-navigationsection", component: <NavigationSection /> },
];

components.forEach(({ id, component }) => {
  const containers = document.querySelectorAll(`.${id}`);
  if (containers) {
    containers.forEach((container) => {
      // Récupère les données depuis l'attribut HTML
      const datasAttr = container.getAttribute("data-datas");
      const datas = datasAttr ? JSON.parse(datasAttr) : undefined;

      // Clone le composant pour injecter les props datas
      const componentWithProps = React.cloneElement(component, { datas });

      console.log("RAW datasAttr:", datasAttr);
      console.log("PARSED datas:", datas);

      createRoot(container).render(
        <StrictMode>{componentWithProps}</StrictMode>
      );
    });
  }
});
