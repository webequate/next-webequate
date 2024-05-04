import type { Service } from "@/types/service";
import { motion } from "framer-motion";
import Image from "next/image";

interface ServiceGridProps {
  services: Service[];
}

const ServiceGrid: React.FC<ServiceGridProps> = ({ services }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-4 shadow-lg rounded-lg bg-white dark:bg-gray-800"
        >
          <div className="flex items-center space-x-4">
            {/* Replacing standard img with Next.js Image component */}
            <div className="w-12 h-12 relative">
              <Image
                src={service.icon}
                alt={service.title}
                layout="fill" // Makes the image fill the container
                objectFit="contain" // Keeps the aspect ratio, adjust as needed
              />
            </div>
            <div>
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {service.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ServiceGrid;
