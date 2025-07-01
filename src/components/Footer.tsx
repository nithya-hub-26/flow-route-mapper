
import { Button } from "@/components/ui/button";
import { Mail, Phone, HelpCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Us
            </h3>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +1 (555) 123-4567
              </p>
              <p>Email: support@synamedia.com</p>
              <p>Address: 123 Tech Street, Silicon Valley, CA</p>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Support
            </h3>
            <div className="space-y-2">
              <Button variant="link" className="text-gray-300 hover:text-white p-0 h-auto">
                Documentation
              </Button>
              <br />
              <Button variant="link" className="text-gray-300 hover:text-white p-0 h-auto">
                Technical Support
              </Button>
              <br />
              <Button variant="link" className="text-gray-300 hover:text-white p-0 h-auto">
                Community Forum
              </Button>
            </div>
          </div>

          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Synamedia</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Leading provider of video software solutions for content creators, 
              service providers, and broadcasters worldwide.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
        </div>
      </div>
    </footer>
  );
};

export default Footer;
