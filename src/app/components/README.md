# Button 컴포넌트

재사용 가능한 버튼 컴포넌트입니다. 다양한 variant, size, icon 옵션을 지원합니다.

## 사용법

```tsx
import Button from './Button';

// 기본 사용법
<Button onClick={() => console.log('클릭!')}>
  버튼
</Button>

// 아이콘과 함께 사용
<Button icon="+" variant="primary">
  추가하기
</Button>

// 아이콘만 있는 버튼
<Button iconOnly icon="×" variant="danger" />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | 버튼 텍스트 |
| `variant` | `'primary' \| 'secondary' \| 'danger' \| 'success'` | `'secondary'` | 버튼 스타일 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 버튼 크기 |
| `icon` | `React.ReactNode` | - | 아이콘 |
| `iconOnly` | `boolean` | `false` | 아이콘만 표시 |
| `disabled` | `boolean` | `false` | 비활성화 상태 |
| `onClick` | `() => void` | - | 클릭 핸들러 |
| `className` | `string` | - | 추가 CSS 클래스 |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | 버튼 타입 |

## Variants

### Primary (보라색)
```tsx
<Button variant="primary" icon="+">
  추가하기
</Button>
```

### Secondary (흰색)
```tsx
<Button variant="secondary" icon="+">
  추가하기
</Button>
```

### Danger (빨간색)
```tsx
<Button variant="danger" icon="×">
  삭제하기
</Button>
```

### Success (초록색)
```tsx
<Button variant="success" icon="✓">
  수정 완료
</Button>
```

## Sizes

### Small
```tsx
<Button size="small">작은 버튼</Button>
```

### Medium (기본)
```tsx
<Button size="medium">중간 버튼</Button>
```

### Large
```tsx
<Button size="large">큰 버튼</Button>
```

## Icon Only 버튼

아이콘만 있는 원형 버튼을 만들 때는 `iconOnly` prop을 사용합니다.

```tsx
<Button 
  iconOnly 
  icon="+" 
  variant="primary" 
  onClick={() => console.log('추가')} 
/>
```

## 비활성화 상태

```tsx
<Button disabled onClick={() => console.log('클릭되지 않음')}>
  비활성화된 버튼
</Button>
```

## 실제 사용 예시

### TodoInput에서 사용
```tsx
<Button 
  type="submit" 
  variant="primary"
  icon="+"
  disabled={!text.trim()}
>
  추가하기
</Button>
```

### TodoItem에서 사용
```tsx
// 편집 버튼
<Button
  variant="secondary"
  size="small"
  iconOnly
  onClick={handleEdit}
  icon={<EditIcon />}
/>

// 삭제 버튼
<Button
  variant="danger"
  size="small"
  iconOnly
  onClick={() => onDelete(todo.id)}
  icon={<DeleteIcon />}
/>
```

## CSS 변수

버튼 컴포넌트는 다음 CSS 변수들을 사용합니다:

- `--color-violet-600`: Primary 버튼 배경색
- `--color-rose-500`: Danger 버튼 배경색
- `--color-lime-300`: Success 버튼 배경색
- `--color-slate-*`: Secondary 버튼 및 텍스트 색상

## 접근성

- 키보드 포커스 시 시각적 표시
- `disabled` 상태에서 적절한 스타일링
- 스크린 리더 지원을 위한 적절한 마크업 