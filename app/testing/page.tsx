import { TestOverflow } from "@/components/ui/test/test-overflow";
import { AnnotationDrawer } from "../(reader)/components/drawer/annotation-drawer";

const aiText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, velit ac aliquet ultrices, urna nisi tincidunt nunc, id lacinia nunc purus in justo. Nulla facilisi. Sed euismod, velit ac aliquet ultrices, urna nisi tincidunt nunc, id lacinia nunc purus in justo. Nulla facilisi.";

export default function TestingPage() {
  return (
    <div>
      {aiText}
      <AnnotationDrawer />
    </div>
  );
}
