# Component Library Reference

Complete reference guide for all UI components in the AIaaS platform.

## Table of Contents
- [Overview](#overview)
- [UI Components](#ui-components)
- [Layout Components](#layout-components)
- [Feature Components](#feature-components)
- [Usage Examples](#usage-examples)

## Overview

AIaaS uses a comprehensive component library built on:
- **Radix UI** - Accessible, unstyled component primitives
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** patterns - Component architecture
- **Custom components** - Feature-specific implementations

All components follow these principles:
- **Accessible** - WCAG 2.1 Level AA compliant
- **Composable** - Can be combined and extended
- **Customizable** - Styled with Tailwind utilities
- **Type-safe** - JSDoc comments for IntelliSense

## UI Components

Located in `src/components/ui/`

### Form Components

#### Button
```javascript
import { Button } from '@/components/ui/button';

<Button variant="default">Click me</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Link</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button disabled>Disabled</Button>
```

**Variants:**
- `default` - Primary action (blue)
- `destructive` - Dangerous action (red)
- `outline` - Secondary action (bordered)
- `secondary` - Alternative action (gray)
- `ghost` - Minimal styling
- `link` - Text link style

**Sizes:** `sm`, `default`, `lg`, `icon`

#### Input
```javascript
import { Input } from '@/components/ui/input';

<Input type="text" placeholder="Enter text" />
<Input type="email" placeholder="email@example.com" />
<Input type="password" placeholder="Password" />
<Input disabled />
```

**Props:**
- All standard HTML input attributes
- `className` for custom styling

#### Textarea
```javascript
import { Textarea } from '@/components/ui/textarea';

<Textarea placeholder="Enter long text" rows={5} />
```

#### Select
```javascript
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

#### Checkbox
```javascript
import { Checkbox } from '@/components/ui/checkbox';

<Checkbox id="terms" />
<label htmlFor="terms">Accept terms</label>
```

#### Radio Group
```javascript
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

<RadioGroup defaultValue="option1">
  <div>
    <RadioGroupItem value="option1" id="r1" />
    <label htmlFor="r1">Option 1</label>
  </div>
  <div>
    <RadioGroupItem value="option2" id="r2" />
    <label htmlFor="r2">Option 2</label>
  </div>
</RadioGroup>
```

#### Switch
```javascript
import { Switch } from '@/components/ui/switch';

<Switch id="notifications" />
<label htmlFor="notifications">Enable notifications</label>
```

#### Slider
```javascript
import { Slider } from '@/components/ui/slider';

<Slider defaultValue={[50]} max={100} step={1} />
```

#### Label
```javascript
import { Label } from '@/components/ui/label';

<Label htmlFor="email">Email address</Label>
<Input id="email" type="email" />
```

### Feedback Components

#### Alert
```javascript
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

<Alert>
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>
    Your changes have been saved.
  </AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong.</AlertDescription>
</Alert>
```

**Variants:** `default`, `destructive`

#### Toast
```javascript
import { useToast } from '@/components/ui/use-toast';

const { toast } = useToast();

toast({
  title: "Success",
  description: "Your message has been sent.",
});

toast({
  title: "Error",
  description: "Something went wrong.",
  variant: "destructive",
});
```

#### Badge
```javascript
import { Badge } from '@/components/ui/badge';

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
```

#### Progress
```javascript
import { Progress } from '@/components/ui/progress';

<Progress value={60} />
```

#### Skeleton
```javascript
import { Skeleton } from '@/components/ui/skeleton';

<Skeleton className="h-4 w-[250px]" />
<Skeleton className="h-4 w-[200px]" />
```

### Overlay Components

#### Dialog (Modal)
```javascript
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>
    {/* Dialog content */}
  </DialogContent>
</Dialog>
```

#### Alert Dialog
```javascript
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

#### Popover
```javascript
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

<Popover>
  <PopoverTrigger asChild>
    <Button>Open popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    Place content here.
  </PopoverContent>
</Popover>
```

#### Tooltip
```javascript
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>
      <p>Tooltip content</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

#### Sheet (Drawer)
```javascript
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

<Sheet>
  <SheetTrigger asChild>
    <Button>Open Sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Title</SheetTitle>
      <SheetDescription>Description</SheetDescription>
    </SheetHeader>
    {/* Sheet content */}
  </SheetContent>
</Sheet>
```

### Navigation Components

#### Tabs
```javascript
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

#### Accordion
```javascript
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Question 1</AccordionTrigger>
    <AccordionContent>Answer 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Question 2</AccordionTrigger>
    <AccordionContent>Answer 2</AccordionContent>
  </AccordionItem>
</Accordion>
```

#### Breadcrumb
```javascript
import { Breadcrumb } from '@/components/ui/breadcrumb';

<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Item', href: '/products/item' },
  ]}
/>
```

#### Pagination
```javascript
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

### Data Display Components

#### Card
```javascript
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

#### Table
```javascript
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

<Table>
  <TableCaption>A list of items.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Item 1</TableCell>
      <TableCell>Active</TableCell>
      <TableCell><Button size="sm">Edit</Button></TableCell>
    </TableRow>
  </TableBody>
</Table>
```

#### Avatar
```javascript
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
```

#### Separator
```javascript
import { Separator } from '@/components/ui/separator';

<div>
  <p>Content above</p>
  <Separator />
  <p>Content below</p>
</div>

<Separator orientation="vertical" />
```

#### Scroll Area
```javascript
import { ScrollArea } from '@/components/ui/scroll-area';

<ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
  {/* Long content */}
</ScrollArea>
```

### Menu Components

#### Dropdown Menu
```javascript
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

#### Context Menu
```javascript
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

<ContextMenu>
  <ContextMenuTrigger>Right click me</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Edit</ContextMenuItem>
    <ContextMenuItem>Copy</ContextMenuItem>
    <ContextMenuItem>Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

#### Navigation Menu
```javascript
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink>Link 1</NavigationMenuLink>
        <NavigationMenuLink>Link 2</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

## Layout Components

Located in `src/components/shell/`

### AppShell
```javascript
import { AppShell } from '@/components/shell/AppShell';

<AppShell>
  {/* Page content */}
</AppShell>
```

**Features:**
- Sidebar navigation
- Top bar with user menu
- Breadcrumb navigation
- Responsive layout
- Mobile menu toggle

### Sidebar
```javascript
import { Sidebar } from '@/components/shell/Sidebar';

<Sidebar
  items={[
    { label: 'Dashboard', icon: Home, href: '/dashboard' },
    { label: 'Projects', icon: Folder, href: '/projects' },
  ]}
/>
```

## Feature Components

### Personalization Components

#### PersonalizationEngine
```javascript
import { PersonalizationEngine } from '@/components/PersonalizationEngine';

// Automatically tracks user behavior and preferences
<PersonalizationEngine />
```

#### SmartRecommendations
```javascript
import { SmartRecommendations } from '@/components/SmartRecommendations';

<SmartRecommendations
  userId={user.id}
  context="content-generation"
/>
```

### Onboarding Components

#### InteractiveOnboarding
```javascript
import { InteractiveOnboarding } from '@/components/onboarding/InteractiveOnboarding';

<InteractiveOnboarding
  steps={[
    { title: 'Welcome', content: <WelcomeStep /> },
    { title: 'Setup', content: <SetupStep /> },
  ]}
  onComplete={handleComplete}
/>
```

#### GuidedTour
```javascript
import { GuidedTour } from '@/components/GuidedTour';

<GuidedTour
  steps={[
    { target: '#feature1', content: 'This is feature 1' },
    { target: '#feature2', content: 'This is feature 2' },
  ]}
/>
```

### Content Components

#### ContentGenerator
```javascript
import { ContentGenerator } from '@/components/content/ContentGenerator';

<ContentGenerator
  contentType="blog"
  onGenerate={handleGenerate}
/>
```

#### ContentEditor
```javascript
import { ContentEditor } from '@/components/content/ContentEditor';

<ContentEditor
  initialValue={content}
  onChange={handleChange}
/>
```

### Strategy Components

#### StrategyWizard
```javascript
import { StrategyWizard } from '@/components/strategy/StrategyWizard';

<StrategyWizard
  onComplete={handleComplete}
/>
```

## Usage Examples

### Complete Form Example
```javascript
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';

export const ContactForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register('name')} />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register('email')} />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};
```

### Data Table with Actions
```javascript
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { DropdownMenu } from '@/components/ui/dropdown-menu';

export const ProjectsTable = ({ projects }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell>{project.name}</TableCell>
            <TableCell>
              <Badge>{project.status}</Badge>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">•••</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
```

### Modal with Form
```javascript
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const CreateProjectModal = ({ open, onOpenChange }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    // Create project
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={handleSubmit}>Create</Button>
      </DialogContent>
    </Dialog>
  );
};
```

## Best Practices

### Accessibility
- Always use semantic HTML elements
- Include `aria-label` for icon-only buttons
- Ensure keyboard navigation works
- Test with screen readers
- Maintain color contrast ratios

### Performance
- Use `lazy` loading for heavy components
- Memoize expensive computations with `useMemo`
- Avoid unnecessary re-renders with `memo`
- Optimize images and assets

### Styling
- Use Tailwind utility classes
- Follow existing component patterns
- Maintain consistent spacing
- Use CSS variables for theming

### Component Composition
- Keep components small and focused
- Use composition over inheritance
- Extract reusable logic into hooks
- Document props with JSDoc

---

For more information:
- [Getting Started](GETTING_STARTED.md)
- [Architecture](ARCHITECTURE.md)
- [API Documentation](API.md)
