export type ContactItem = {
  label: string;
  values: string[];
};

interface ContactsPanelProps {
  items: ContactItem[];
}

export const ContactsPanel = ({ items }: ContactsPanelProps) => {
  return (
    <div className="bg-background-primary-default border-1 border-border-primary-default p-8 rounded-md h-full">
      <h2 className="text-xl font-bold mb-6">Contacts</h2>

      <div className="space-y-5">
        {items.map((item) => (
          <div key={item.label} className="grid grid-cols-[4fr_8fr] gap-4">
            <div className="text-text-secondary-default text-sm">
              {item.label}
            </div>
            <div className="text-left">
              {item.values.map((value) => (
                <div key={value} className="text-sm">
                  {value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
