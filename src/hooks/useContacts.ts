import { useQuery, useMutation, useQueryClient } from "react-query";
import apiClient from "../api/contacts";

const fetchContacts = async () => {
  const { data } = await apiClient.get("/contacts", {
    params: { sort: "created:desc" },
  });
  return data;
};

const createContact = async (contactData: any) => {
  const { data } = await apiClient.post("/contact", contactData);
  return data;
};

const deleteContact = async (id: string) => {
  await apiClient.delete(`/contact/${id}`);
};

const fetchContact = async (id: string) => {
  const { data } = await apiClient.get(`/contact/${id}`);
  return data;
};

export const useContacts = () => {
  return useQuery("contacts", fetchContacts);
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();
  return useMutation(createContact, {
    onSuccess: () => queryClient.invalidateQueries("contacts"),
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteContact, {
    onSuccess: () => queryClient.invalidateQueries("contacts"),
  });
};

export const useContact = (id: string) => {
  return useQuery(["contact", id], () => fetchContact(id));
};

const addTagsToContact = async ({
  id,
  tags,
}: {
  id: string;
  tags: string[];
}) => {
  try {
    const response = await apiClient.put(`/contacts/${id}/tags`, { tags });
    return response.data;
  } catch (error) {
    console.error(`Failed to add tags to contact with ID ${id}`, error);
    throw error;
  }
};

export const useAddTagsToContact = () => {
  const queryClient = useQueryClient();
  return useMutation(addTagsToContact, {
    onSuccess: () => queryClient.invalidateQueries("contact"),
  });
};
