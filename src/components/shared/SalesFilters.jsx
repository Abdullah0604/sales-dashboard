"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export function SalesFilters({ filters, onFilterChange }) {
  const handleChange = (field, value) => {
    onFilterChange({
      ...filters,
      [field]: value,
    });
  };

  const handleReset = () => {
    onFilterChange({
      startDate: new Date(new Date().setDate(new Date().getDate() - 30))
        .toISOString()
        .split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
      minPrice: "",
      email: "",
      phone: "",
    });
  };

  return (
    <Card className="p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {/* Date Range */}
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Start Date
          </label>
          <Input
            type="date"
            value={filters.startDate}
            onChange={(e) => handleChange("startDate", e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            End Date
          </label>
          <Input
            type="date"
            value={filters.endDate}
            onChange={(e) => handleChange("endDate", e.target.value)}
            className="w-full"
          />
        </div>

        {/* Min Price */}
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Min Price ($)
          </label>
          <Input
            type="number"
            placeholder="0"
            value={filters.minPrice}
            onChange={(e) => handleChange("minPrice", e.target.value)}
            className="w-full"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Email
          </label>
          <Input
            type="email"
            placeholder="customer@example.com"
            value={filters.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Phone
          </label>
          <Input
            type="tel"
            placeholder="+1 234 567 8900"
            value={filters.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Button
          onClick={handleReset}
          variant="default"
          className="w-full md:w-auto "
        >
          Reset Filters
        </Button>
      </div>
    </Card>
  );
}
