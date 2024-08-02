interface RawContact {
  id: string;
  avatar_url: string;
  fields: {
    "first name"?: Array<{ value: string }>;
    "last name"?: Array<{ value: string }>;
    email?: Array<{ value: string }>;
  };
  tags: Array<{ id: string; name: string }>;
}

interface Contact {
  id: string;
  avatar_url: string;
  first_name: string;
  last_name: string;
  email: string;
  tags: Array<{ id: string; name: string }>;
}

export const transformContactData = (data: any): Contact[] => {
  if (!data || !Array.isArray(data.resources)) return [];

  return data.resources.map((item: RawContact) => ({
    id: item.id,
    avatar_url: item.avatar_url,
    first_name: item.fields["first name"]?.[0]?.value || "",
    last_name: item.fields["last name"]?.[0]?.value || "",
    email: item.fields.email?.[0]?.value || "",
    tags: item.tags || [],
  }));
};
