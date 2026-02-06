"use client";

import { motion } from "framer-motion";
import * as Icons from "react-icons/fa";
import type { Service } from "@/types/service";

interface ServiceGridClientProps {
  services: Service[];
}

const ServiceGridClient: React.FC<ServiceGridClientProps> = ({ services }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
      {services.map((service) => {
        const Icon = Icons[service.icon as keyof typeof Icons];

        return (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 shadow-lg rounded-lg bg-white dark:bg-gray-800"
          >
            <div className="flex items-center space-x-6">
              <div className="w-12 h-12 flex items-center justify-center">
                {Icon ? (
                  <Icon className="text-blue-500 w-8 h-8" />
                ) : (
                  <span className="text-red-500">Icon not found</span>
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ServiceGridClient;
