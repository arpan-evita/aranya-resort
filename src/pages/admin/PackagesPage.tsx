import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit, ToggleLeft, ToggleRight, Package, IndianRupee, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { PackageType } from "@/types/booking";

interface PackageData {
  id: string;
  name: string;
  slug: string;
  package_type: PackageType;
  description: string | null;
  short_description: string | null;
  duration_nights: number;
  is_fixed_price: boolean;
  fixed_price: number | null;
  per_night_price: number | null;
  is_active: boolean;
  is_featured: boolean;
  sort_order: number | null;
}

interface PackageFormData {
  name: string;
  slug: string;
  package_type: PackageType;
  description: string;
  short_description: string;
  duration_nights: number;
  is_fixed_price: boolean;
  fixed_price: number;
  per_night_price: number;
  is_active: boolean;
  is_featured: boolean;
}

const packageTypes: { value: PackageType; label: string }[] = [
  { value: "honeymoon", label: "Honeymoon" },
  { value: "safari", label: "Safari" },
  { value: "family", label: "Family" },
  { value: "corporate", label: "Corporate" },
  { value: "weekend", label: "Weekend" },
  { value: "wedding", label: "Wedding" },
  { value: "seasonal", label: "Seasonal" },
];

const defaultFormData: PackageFormData = {
  name: "",
  slug: "",
  package_type: "weekend",
  description: "",
  short_description: "",
  duration_nights: 2,
  is_fixed_price: true,
  fixed_price: 10000,
  per_night_price: 0,
  is_active: true,
  is_featured: false,
};

export default function PackagesPage() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<PackageData | null>(null);
  const [formData, setFormData] = useState<PackageFormData>(defaultFormData);

  const { data: packages, isLoading } = useQuery({
    queryKey: ["admin", "packages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as PackageData[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data: PackageFormData & { id?: string }) => {
      const payload = {
        ...data,
        fixed_price: data.is_fixed_price ? data.fixed_price : null,
        per_night_price: data.is_fixed_price ? null : data.per_night_price,
      };
      
      if (data.id) {
        const { error } = await supabase.from("packages").update(payload).eq("id", data.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("packages").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "packages"] });
      setDialogOpen(false);
      setEditingPackage(null);
      setFormData(defaultFormData);
      toast({ title: "Package saved successfully" });
    },
    onError: (error: any) => {
      toast({ variant: "destructive", title: "Error", description: error.message });
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase.from("packages").update({ is_active }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "packages"] });
      toast({ title: "Status updated" });
    },
  });

  const handleEdit = (pkg: PackageData) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      slug: pkg.slug,
      package_type: pkg.package_type,
      description: pkg.description || "",
      short_description: pkg.short_description || "",
      duration_nights: pkg.duration_nights,
      is_fixed_price: pkg.is_fixed_price,
      fixed_price: pkg.fixed_price || 0,
      per_night_price: pkg.per_night_price || 0,
      is_active: pkg.is_active,
      is_featured: pkg.is_featured,
    });
    setDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate({ ...formData, id: editingPackage?.id });
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-medium">Packages</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage resort packages and experiences</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            setEditingPackage(null);
            setFormData(defaultFormData);
          }
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Package
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPackage ? "Edit Package" : "Add New Package"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Package Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ 
                        ...formData, 
                        name: e.target.value,
                        slug: editingPackage ? formData.slug : generateSlug(e.target.value)
                      });
                    }}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Package Type</Label>
                  <Select
                    value={formData.package_type}
                    onValueChange={(v) => setFormData({ ...formData, package_type: v as PackageType })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      {packageTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (nights)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min={1}
                    value={formData.duration_nights}
                    onChange={(e) => setFormData({ ...formData, duration_nights: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="short_desc">Short Description</Label>
                <Input
                  id="short_desc"
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  placeholder="Brief summary for listings..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Full Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={formData.is_fixed_price}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_fixed_price: checked })}
                  />
                  <Label>Fixed Price Package</Label>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  {formData.is_fixed_price ? (
                    <div className="space-y-2">
                      <Label htmlFor="fixed_price">Fixed Price (₹)</Label>
                      <Input
                        id="fixed_price"
                        type="number"
                        min={0}
                        value={formData.fixed_price}
                        onChange={(e) => setFormData({ ...formData, fixed_price: parseFloat(e.target.value) })}
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="per_night">Per Night Price (₹)</Label>
                      <Input
                        id="per_night"
                        type="number"
                        min={0}
                        value={formData.per_night_price}
                        onChange={(e) => setFormData({ ...formData, per_night_price: parseFloat(e.target.value) })}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label>Active</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                  />
                  <Label>Featured</Label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saveMutation.isPending}>
                  {saveMutation.isPending ? "Saving..." : "Save Package"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-0 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead>Package Name</TableHead>
              <TableHead className="text-center">Type</TableHead>
              <TableHead className="text-center">Duration</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 6 }).map((_, j) => (
                    <TableCell key={j}><Skeleton className="h-4 w-full" /></TableCell>
                  ))}
                </TableRow>
              ))
            ) : packages?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  No packages found. Add your first package.
                </TableCell>
              </TableRow>
            ) : (
              packages?.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {pkg.is_featured && (
                        <Badge variant="outline" className="text-[10px] border-[hsl(var(--gold))] text-[hsl(var(--gold))]">
                          Featured
                        </Badge>
                      )}
                      <div>
                        <p className="font-medium">{pkg.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{pkg.slug}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary" className="capitalize">
                      {pkg.package_type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1 text-sm">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      {pkg.duration_nights}N
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-0.5">
                      <IndianRupee className="h-3.5 w-3.5" />
                      {pkg.is_fixed_price
                        ? Number(pkg.fixed_price || 0).toLocaleString("en-IN")
                        : `${Number(pkg.per_night_price || 0).toLocaleString("en-IN")}/night`}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={pkg.is_active ? "default" : "secondary"}>
                      {pkg.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleEdit(pkg)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => toggleStatusMutation.mutate({ id: pkg.id, is_active: !pkg.is_active })}
                      >
                        {pkg.is_active ? (
                          <ToggleRight className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <ToggleLeft className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
