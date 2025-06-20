import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
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

const allIcons = {
  ...FaIcons,
  ...SiIcons,
  ...MdIcons,
  ...GiIcons,
};

function getIconComponent(iconName) {
  const Icon = allIcons[iconName];
  return Icon ? <Icon className="inline-block mr-1" /> : null;
}

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.enum(["hard", "soft", "language"]),
  icon: z.string().optional(),
  level: z.string().optional(),
});

function AdminSkills() {
  const { data: skills = [] } = useSkillsQuery();
  const createSkill = useCreateSkill();
  const updateSkill = useUpdateSkill();
  const deleteSkill = useDeleteSkill();

  const [editingId, setEditingId] = useState(null);
  const [customIcon, setCustomIcon] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const selectedCategory = watch("category");
  const selectedIcon = watch("icon");

  const onSubmit = (formData) => {
    if (editingId) {
      updateSkill.mutate({ id: editingId, data: formData });
    } else {
      createSkill.mutate(formData);
    }
    reset({ category: "hard" });
    setEditingId(null);
    setCustomIcon("");
  };

  const handleEdit = (skill) => {
    setEditingId(skill.id);
    reset(skill);
    setCustomIcon(skill.icon);
  };

  const suggestions = Object.keys(allIcons)
    .filter((key) => key.toLowerCase().includes(customIcon.toLowerCase()))
    .slice(0, 5);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Skills</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid sm:grid-cols-5 gap-4 mb-8 items-end"
      >
        <select
          {...register("category")}
          defaultValue="hard"
          className="px-3 py-2 border border-gray-300 rounded"
        >
          <option value="">Select category</option>
          <option value="hard">Hard</option>
          <option value="soft">Soft</option>
          <option value="language">Language</option>
        </select>

        <input
          {...register("name")}
          placeholder="Skill name"
          className="px-3 py-2 border border-gray-300 rounded"
        />

        {(selectedCategory === "hard" || selectedCategory === "soft") && (
          <div className="space-y-1 col-span-1 relative">
            <input type="hidden" {...register("icon")} />

            <Select
              options={iconOptions}
              getOptionLabel={(e) => (
                <div className="flex items-center space-x-2">
                  {e.icon} <span>{e.label}</span>
                </div>
              )}
              onChange={(opt) => {
                setValue("icon", opt?.value || "");
                setCustomIcon(opt?.value || "");
              }}
              placeholder="Pick tech icon"
              value={iconOptions.find((o) => o.value === selectedIcon) || null}
              isClearable
            />

            <input
              type="text"
              value={customIcon}
              onChange={(e) => {
                setCustomIcon(e.target.value);
                setValue("icon", e.target.value);
              }}
              placeholder="or enter icon name (e.g. FaLaravel)"
              className="w-full px-2 py-1 border border-gray-300 rounded text-xs pr-10"
            />

            {customIcon && (
              <div className="absolute z-10 mt-1 bg-white dark:bg-slate-800 border rounded w-full shadow max-h-40 overflow-auto text-xs">
                {suggestions.length > 0 ? (
                  suggestions.map((name) => (
                    <div
                      key={name}
                      onClick={() => {
                        setValue("icon", name);
                        setCustomIcon(name);
                      }}
                      className="px-3 py-1 cursor-pointer hover:bg-cyan-100 dark:hover:bg-slate-600 flex items-center gap-2"
                    >
                      {getIconComponent(name)} {name}
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-2 text-gray-400">No matches</div>
                )}
              </div>
            )}
          </div>
        )}

        {selectedCategory === "language" && (
          <input
            {...register("level")}
            placeholder="Level (e.g. Intermediate)"
            className="px-3 py-2 border border-gray-300 rounded"
          />
        )}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {editingId ? "Update" : "Create"}
        </button>
      </form>

      <div className="grid gap-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="flex justify-between items-center bg-slate-100 dark:bg-slate-800 p-4 rounded shadow"
          >
            <div>
              <div className="text-lg font-semibold">
                {getIconComponent(skill.icon)} {skill.name}
              </div>
              <div className="text-sm text-gray-500">
                {skill.category}
                {skill.level && ` — ${skill.level}`}
              </div>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(skill)}
                className="px-3 py-1 bg-yellow-400 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteSkill.mutate(skill.id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminSkills;
