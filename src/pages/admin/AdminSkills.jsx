import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import toast, { Toaster } from "react-hot-toast"; // YAXSHILANISH: Xabarnomalar uchun kutubxona
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as MdIcons from "react-icons/md";
import * as GiIcons from "react-icons/gi";

import {
  useSkillsQuery,
  useCreateSkill,
  useUpdateSkill,
  useDeleteSkill,
} from "../../api/skillApi";
import { iconOptions } from "../../constants/iconOptions";

// All available icons (o'zgarishsiz)
const allIcons = { ...FaIcons, ...SiIcons, ...MdIcons, ...GiIcons };

// Preview for icon (o'zgarishsiz)
function getIconComponent(iconName) {
  const Icon = allIcons[iconName];
  return Icon ? <Icon className="inline-block" size={20} /> : null;
}

// Schema (o'zgarishsiz)
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.enum(["hard", "soft", "language"]),
  icon: z.string().optional(),
  level: z.string().optional(),
});

// YAXSHILANISH: Tailwind klasslarini qisqartirish uchun o'zgaruvchilar
const inputClasses =
  "w-full px-3 py-2 bg-slate-50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 transition";
const buttonClasses = {
  primary:
    "flex items-center justify-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed",
  secondary:
    "flex items-center justify-center gap-2 px-4 py-2 bg-slate-500 text-white rounded-md hover:bg-slate-600 transition-colors",
  danger:
    "p-2 text-red-500 rounded-md hover:bg-red-500/10 transition-colors disabled:text-slate-400",
  warning:
    "p-2 text-yellow-500 rounded-md hover:bg-yellow-500/10 transition-colors",
};

function AdminSkills() {
  const { data: skills = [], isLoading: isSkillsLoading } = useSkillsQuery();

  const [editingId, setEditingId] = useState(null);

  // YAXSHILANISH: Formani tozalash uchun markazlashtirilgan funksiya
  const resetForm = () => {
    reset({ category: "hard", name: "", icon: "", level: "" });
    setEditingId(null);
  };

  // YAXSHILANISH: Operatsiyalar natijasi haqida xabarnoma berish
  const createSkill = useCreateSkill({
    onSuccess: () => {
      toast.success("Ko'nikma muvaffaqiyatli yaratildi!");
      resetForm();
    },
    onError: (err) =>
      toast.error(err.message || "Yaratishda xatolik yuz berdi"),
  });

  const updateSkill = useUpdateSkill({
    onSuccess: () => {
      toast.success("Ko'nikma muvaffaqiyatli yangilandi!");
      resetForm();
    },
    onError: (err) =>
      toast.error(err.message || "Yangilashda xatolik yuz berdi"),
  });

  const deleteSkill = useDeleteSkill({
    onSuccess: () => toast.success("Ko'nikma o'chirildi!"),
    onError: (err) =>
      toast.error(err.message || "O'chirishda xatolik yuz berdi"),
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { category: "hard", name: "", icon: "", level: "" },
  });

  const selectedCategory = watch("category");
  const selectedIcon = watch("icon");

  const onSubmit = (formData) => {
    if (editingId) {
      updateSkill.mutate({ id: editingId, ...formData });
    } else {
      createSkill.mutate(formData);
    }
  };

  const handleEdit = (skill) => {
    setEditingId(skill.id);
    reset(skill);
    window.scrollTo({ top: 0, behavior: "smooth" }); // YAXSHILANISH: Formaga avto-skroll
  };

  const handleDelete = (skillId, skillName) => {
    // YAXSHILANISH: O'chirishdan oldin tasdiqlash so'rovi
    if (
      window.confirm(
        `Siz rostdan ham "${skillName}" ko'nikmasini o'chirmoqchimisiz?`
      )
    ) {
      deleteSkill.mutate(skillId);
    }
  };

  const isMutating = createSkill.isLoading || updateSkill.isLoading;

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
        Ko'nikmalarni Boshqarish
      </h1>

      {/* YAXSHILANISH: Forma uchun alohida, chiroyli "Kartochka" */}
      <div className="bg-white dark:bg-slate-800/50 p-6 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-semibold mb-6 text-slate-700 dark:text-slate-200">
          {editingId ? "Ko'nikmani Tahrirlash" : "Yangi Ko'nikma Qo'shish"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-6 gap-5 items-start"
        >
          <div className="md:col-span-1">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="category"
            >
              Kategoriya
            </label>
            <select
              id="category"
              {...register("category")}
              className={inputClasses}
            >
              <option value="hard">Hard Skill</option>
              <option value="soft">Soft Skill</option>
              <option value="language">Til</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Nomi
            </label>
            <input
              id="name"
              {...register("name")}
              placeholder="Masalan, React"
              className={inputClasses}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {(selectedCategory === "hard" || selectedCategory === "soft") && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1" htmlFor="icon">
                Ikonka
              </label>
              <Select
                id="icon"
                options={iconOptions}
                value={
                  iconOptions.find((o) => o.value === selectedIcon) || null
                }
                onChange={(opt) =>
                  setValue("icon", opt?.value || "", { shouldValidate: true })
                }
                placeholder="Ikonka tanlang..."
                isClearable
                styles={
                  {
                    /* Dark mode uchun stillar bu yerga qo'shilishi mumkin */
                  }
                }
              />
            </div>
          )}

          {selectedCategory === "language" && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1" htmlFor="level">
                Daraja
              </label>
              <input
                id="level"
                {...register("level")}
                placeholder="Masalan, B2"
                className={inputClasses}
              />
            </div>
          )}

          <div className="flex items-end gap-2 md:col-span-1 h-full">
            <button
              type="submit"
              disabled={isMutating}
              className={buttonClasses.primary}
            >
              {isMutating ? (
                <FaIcons.FaSpinner className="animate-spin" />
              ) : editingId ? (
                <FaIcons.FaSave />
              ) : (
                <FaIcons.FaPlus />
              )}
              <span className="hidden sm:inline">
                {editingId ? "Saqlash" : "Yaratish"}
              </span>
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className={buttonClasses.secondary}
              >
                <FaIcons.FaTimes />
                <span className="hidden sm:inline">Bekor</span>
              </button>
            )}
          </div>
        </form>
      </div>

      {/* YAXSHILANISH: Ko'nikmalar ro'yxati uchun alohida Kartochka va Jadval */}
      <div className="bg-white dark:bg-slate-800/50 p-6 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-300">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Ko'nikma
                </th>
                <th scope="col" className="px-6 py-3">
                  Kategoriya
                </th>
                <th scope="col" className="px-6 py-3 hidden md:table-cell">
                  Daraja
                </th>
                <th scope="col" className="px-6 py-3 text-right">
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody>
              {isSkillsLoading ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    Yuklanmoqda...
                  </td>
                </tr>
              ) : (
                skills.map((skill) => (
                  <tr
                    key={skill.id}
                    className="border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white flex items-center gap-3">
                      {getIconComponent(skill.icon)}
                      <span>{skill.name}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300 capitalize">
                      {skill.category}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300 hidden md:table-cell">
                      {skill.level || "—"}
                    </td>
                    <td className="px-6 py-4 text-right space-x-1">
                      <button
                        onClick={() => handleEdit(skill)}
                        className={buttonClasses.warning}
                        aria-label="Tahrirlash"
                      >
                        <FaIcons.FaPencilAlt />
                      </button>
                      <button
                        onClick={() => handleDelete(skill.id, skill.name)}
                        disabled={deleteSkill.isLoading}
                        className={buttonClasses.danger}
                        aria-label="O'chirish"
                      >
                        {deleteSkill.isLoading &&
                        deleteSkill.variables === skill.id ? (
                          <FaIcons.FaSpinner className="animate-spin" />
                        ) : (
                          <FaIcons.FaTrash />
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminSkills;
