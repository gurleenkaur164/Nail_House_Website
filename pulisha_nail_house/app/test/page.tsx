"use client";
import { supabase } from "@/lib/supabase";

export default function TestPage() {
  const testInsert = async () => {
    const { data, error } = await supabase
      .from("appointments")
      .insert([
        {
          customer_name: "Test User",
          phone: "9999999999",
          service: "Gel Extensions",
          status: "pending",
        },
      ]);

    console.log("DATA:", data);
    console.log("ERROR:", error);
  };

  return (
    <div className="p-10">
      <button
        onClick={testInsert}
        className="bg-black text-white px-4 py-2"
      >
        Test Supabase Insert
      </button>
    </div>
  );
}