'use client'
interface ChapterActionsProps {
  disabled: boolean
  courseId: string
  chapterId: string
  isPublished: boolean
}

export const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionsProps) => {
  return (
    <div className="flex items-center gap-x-2">
      {/* <Button
        onClick={() => {}}
        disabled={disabled}
        variant="outline"
        size="sm"
        >
        {isPublished ? "Unpublish" : "Publish"}
        </Button>
            <Button>
                <Trash/>
            </Button>
        </Button>
            */}
    </div>
  )
}
