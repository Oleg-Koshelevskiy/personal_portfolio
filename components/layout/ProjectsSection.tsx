"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "../ProjectCard";
import { motion, useInView } from "framer-motion";
import ProjectTag from "../ProjectTag";

const projectsData = [
  {
    id: 1,
    title: "Fitness Center",
    description: "Fitness Center landing page",
    image: "assets//images/projects/ellada.jpg",
    tag: ["All", "Commercial"],
    gitUrl: "https://github.com/Oleg-Koshelevskiy/ellada",
    previewUrl: "https://ellada-sport.km.ua/",
  },
  {
    id: 2,
    title: "Weather and Map",
    description: "React Weather and Map Application",
    image: "assets//images/projects/weather.jpg",
    tag: ["All", "Opensouse"],
    gitUrl: "https://github.com/Oleg-Koshelevskiy/Weather-and-map",
    previewUrl: "https://weather-and-map.netlify.app/",
  },
  {
    id: 3,
    title: "Eco Shop",
    description: "Eco Shop E-commerce NextJS application",
    image: "assets//images/projects/eco-shop.jpg",
    tag: ["All", "Opensouse"],
    gitUrl: "https://github.com/Oleg-Koshelevskiy/eco-shop",
    previewUrl: "https://eco-shop-example.vercel.app/",
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag: any) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-col sm:flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Commercial"
          isSelected={tag === "Commercial"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Opensouse"
          isSelected={tag === "Opensouse"}
        />
      </div>
      <ul
        ref={ref}
        className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12 mx-2"
      >
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
